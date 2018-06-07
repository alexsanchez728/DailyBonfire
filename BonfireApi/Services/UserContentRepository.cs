using DailyBonfireProject.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace DailyBonfireProject.Services
{
    public class UserContentRepository
    {
        private IConfiguration _config;

        public UserContentRepository(IConfiguration config)
        {
            _config = config;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_config["ConnectionStrings:Bonfire"]);
        }

        // when the user wants to see all public content AND content they've saved privately
        public List<ContentDisplayDto> GetContentVisibleToYou(int userId)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var results = db.Query<ContentDisplayDto>(@"Select * from UserContent
                                                            Join Content on UserContent.ContentId = Content.Id
                                                            Where UserContent.IsPublic = 1
                                                            Or UserContent.UserId = @userId;", new { userId });
                return results.ToList();
            } 
        }

        // when the user is getting one piece of content
        public ContentDisplayDto GetById(int id)
        {
            using (var db = GetConnection())
            {
                db.Open();
                // This isn't going to go thru since Id exists twice in this object, i need it to map to UC's id
                var result = db.QueryFirstOrDefault<ContentDisplayDto>(@"Select * 
                                                                            From UserContent
                                                                            Join Content on UserContent.ContentId = Content.Id
                                                                            Where Content.id = @id", new { id });

                return result;
            }
        }

        // when the user wants to see all content a user (themselves included) has saved
        public List<ContentDisplayDto> GetByUserId(int currentUserId, int UserId)
        {
            using (var db = GetConnection())
            {
                // get content by UserId. if this current user is not the OP, then show only this user's public content
                db.Open();
                var results = db.Query<ContentDisplayDto>(@"Select * 
                                                                        From UserContent
                                                                        Join Content on UserContent.ContentId = Content.Id
                                                                        Where UserId = @UserId and 
                                                                        (case 
	                                                                        when @userid = @currentUserId then 1 
	                                                                        when UserContent.IsPublic = 1 then 1 
	                                                                        else 0 
                                                                        end) = 1"
                                                                        , new { currentUserId, UserId });
                return results.ToList();
            }
        }

        public bool Post(object input)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Insert into UserContent
                                                    ([UserId]
                                                    ,[ContentId]
                                                    ,[UserBoardId]
                                                    ,[UserDescription]
                                                    ,[IsPublic])
                                                Values
                                                    (@UserId
                                                    ,@ContentId
                                                    ,@UserBoardId
                                                    ,@UserDescription
                                                    ,@IsPublic", input);
                return result == 1;
            }
        }

        public bool Put(UserContentDto UserContent)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Update UserContent
                                            Set [UserId] = @UserId
                                                ,[ContentId] = @ContentId
                                                ,[UserBoardId] = @UserBoardId
                                                ,[UserDescription] = @UserDescription
                                                ,[IsPublic] = @IsPublic", UserContent);
                return result == 1;
            }
        }

        public bool Delete(int id)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Delete fron UserContent where id = @id", new { id });
                return result == 1;
            }
        }
    }
}