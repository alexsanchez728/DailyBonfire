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

        // when the user wants to see all public content AND content they've saved privately, orderby added to show recent content at top
        public List<ContentDisplayDto> GetContentVisibleToYou(int userId)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var results = db.Query<ContentDisplayDto>(@"select 
                                                                c.UserId AS userId,
                                                                ContentId,
                                                                UserDescription,
                                                                c.IsPublic,
                                                                [Name] AS UserName,
                                                                UserBoardId,
                                                                b.Title AS BoardTitle,
                                                                content.Title AS ContentTitle,
                                                                WebsiteDescription,
                                                                [url]
                                                            from Boards b
	                                                            Join UserBoard ub
		                                                            On b.Id = ub.BoardId
	                                                            Join UserContent c
		                                                            On ub.Id = c.UserBoardId
	                                                            Join [User] on c.UserId = [User].Id
                                                                Join Content on c.ContentId = Content.Id

	                                                            Where c.IsPublic = 1
	                                                            OR c.UserId = @userId

                                                                Order By c.id Desc", new { userId });
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
                var result = db.QueryFirstOrDefault<ContentDisplayDto>(@"Select
                                                                            c.id AS Id,
                                                                            c.UserId AS userId,
                                                                            ContentId,
                                                                            UserDescription,
                                                                            c.IsPublic,
                                                                            UserBoardId,
                                                                            content.Title AS ContentTitle,
                                                                            [url]
                                                                        From UserContent c
                                                                        Join Content on c.ContentId = Content.Id
                                                                        Where Content.id = @id", new { id });

                return result;
            }
        }
        // when the user is getting one piece of content
        public List<ContentDisplayDto> GetByBoardId(int boardId, int userId)
        {
            using (var db = GetConnection())
            {
                db.Open();
                // This isn't going to go thru since Id exists twice in this object, i need it to map to UC's id
                var results = db.Query<ContentDisplayDto>(@"select 
                                                                c.UserId AS userId,
                                                                c.id AS Id,
                                                                ContentId,
                                                                UserDescription,
                                                                ub.IsPublic,
                                                                [Name] AS UserName,
                                                                UserBoardId,
                                                                b.id AS BoardId,
                                                                b.Title AS BoardTitle,
                                                                content.Title AS ContentTitle,
                                                                WebsiteDescription,
                                                                [url]
                                                            from Boards b
	                                                            Join UserBoard ub
		                                                            On b.Id = ub.BoardId
	                                                            Join UserContent c
		                                                            On ub.Id = c.UserBoardId
	                                                            Join [User] on c.UserId = [User].Id
                                                                Join Content on c.ContentId = Content.Id
	                                                            Where b.id = @boardId
	                                                            and c.UserId = @userId", new { boardId, userId });

                return results.ToList();
            }
        }

        // when the user wants to see all content a user (themselves included) has saved
        public List<ContentDisplayDto> GetByUserId(int currentUserId, int userId)
        {
            using (var db = GetConnection())
            {
                // get content by UserId. if this current user is not the OP, then show only this user's public content
                db.Open();
                var results = db.Query<ContentDisplayDto>(@"Select 
                                                                    uc.id,
                                                                    UserId,
	                                                                [Name] AS UserName,
                                                                    ContentId,
                                                                    UserDescription,
                                                                    IsPublic,
                                                                    title AS ContentTitle,
                                                                    WebsiteDescription,
                                                                    [url]
                                                                From UserContent uc
                                                                Join Content on uc.ContentId = Content.Id
                                                                Join [User] on uc.UserId = [User].Id

                                                                Where 
                                                                (case
	                                                                when uc.UserId = @userId AND @userId = @currentUserId then 1
	                                                                when uc.IsPublic = 1 AND uc.UserId = @userId then 1 
	                                                                else 0
                                                                end) = 1", new { currentUserId, userId });
                return results.ToList();
            }
        }

        public bool AddNewUserContent(UserContentDto input)
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
                                                    ,@IsPublic)", input);
                return result == 1;
            }
        }

        public bool UpdateUserContent(UserContentDto UserContent)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Update UserContent
                                            Set [UserId] = @UserId
                                                ,[UserBoardId] = @UserBoardId
                                                ,[UserDescription] = @UserDescription
                                                ,[IsPublic] = @IsPublic
                                            where [Id] = @Id", UserContent);
                return result == 1;
            }
        }

        public bool DeleteUserContent(int id)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Delete from UserContent where ContentId = @id", new { id });
                return result == 1;
            }
        }
    }
}