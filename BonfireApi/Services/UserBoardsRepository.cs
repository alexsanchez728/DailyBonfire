using DailyBonfireProject.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace DailyBonfireProject.Services
{
    public class UserBoardsRepository
    {
        private IConfiguration _config;

        public UserBoardsRepository(IConfiguration config)
        {
            _config = config;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_config["ConnectionStrings:Bonfire"]);
        }
        // when the user wants to see all public boards AND boards they've marked as private
        public List<BoardDisplayDto> GetContentVisibleToYou(int userId)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var results = db.Query<BoardDisplayDto>(@"Select * 
                                                                From UserBoard
                                                                Join Boards on UserBoard.BoardId = Boards.Id
                                                                Where
                                                                (case 
	                                                                when UserBoard.IsPublic = 1 then 1
	                                                                when UserBoard.UserId = @userId then 1
	                                                                else 0 
                                                                end) = 1", new { userId });
                return results.ToList();
            }
        }

        // for getting one board by id
        public BoardDisplayDto GetById(int id)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.QueryFirstOrDefault<BoardDisplayDto>(@"Select 
                                                                        UserId, 
                                                                        BoardId, 
                                                                        IsPublic,
                                                                        Title, 
                                                                        DescriptionFromUser,
                                                                        [Name] AS UserName
                                                                            From UserBoard
                                                                            Join Boards on UserBoard.BoardId = Boards.Id
                                                                            Join [User] on UserBoard.UserId = [User].Id

                                                                            where Boards.id = @id AND [User].Id = UserBoard.UserId"
                                                                            , new { id });
                return result;
            }
        }

        // for getting all boards with this user's id
        public List<BoardDisplayDto> GetByUserId(int currentUserId, int UserId)
        {
            using (var db = GetConnection())
            {
                // get content by UserId. if this current user is not the OP, then show only this user's public boards
                db.Open();
                var results = db.Query<BoardDisplayDto>(@"Select * 
                                                                From UserBoard
                                                                Join Boards on UserBoard.BoardId = Boards.Id
                                                                Where UserId = @UserId and 
                                                                (case 
	                                                                when @userid = @currentUserId then 1 
	                                                                when UserBoard.IsPublic = 1 then 1 
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
                var result = db.Execute(@"Insert into UserBoard
                                                    ([UserId]
                                                    ,[BoardId]
                                                    ,[IsPublic])
                                                Values
                                                    (@UserId
                                                    ,@BoardId
                                                    ,@IsPublic", input);
                return result == 1;
            }
        }

        public bool Put(UserBoardsDto userBoard)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Update UserBoard
                                            Set [UserId] = @UserId
                                                ,[BoardId] = @BoardId
                                                ,[IsPublic] = @IsPublic", userBoard);
                return result == 1;
            }
        }

        public bool Delete(int id)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Delete fron UserBoard where id = @id", new { id });
                return result == 1;
            }
        }
    }
}