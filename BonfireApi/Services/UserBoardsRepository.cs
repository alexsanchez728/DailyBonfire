﻿using DailyBonfireProject.Models;
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
                                                                        UserBoard.Id AS Id,
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
        
        public BoardDisplayDto GetByUserAndBoardId(int currentUserId, int boardId)
        {
            using (var db = GetConnection())
            {
                // get content by UserId. if this current user is not the OP, then show only this user's public boards
                db.Open();
                var result = db.QueryFirstOrDefault<BoardDisplayDto>(@"select *
                                                                From userBoard
                                                                where UserId = @currentUserId
                                                                And
                                                                BoardId = @boardId"
                                                                , new { currentUserId, boardId });
                return result;
            }
        }


        // for getting all boards with this user's id
        public List<BoardDisplayDto> GetByUserId(int currentUserId, int userId)
        {
            using (var db = GetConnection())
            {
                // get content by UserId. if this current user is not the OP, then show only this user's public boards
                db.Open();
                var results = db.Query<BoardDisplayDto>(@"Select
	                                                            b.id AS BoardId,
	                                                            Title,
	                                                            [Name] AS userName,
	                                                            DescriptionFromUser,
	                                                            ub.id AS id,
	                                                            IsPublic,
	                                                            UserId
                                                            from Boards b
                                                            Join UserBoard ub
	                                                            On b.Id = ub.BoardId
                                                            Join [User] on ub.UserId = [User].Id
                                                            Where 
                                                            (case
	                                                            when ub.UserId = @userId AND @userId = @currentUserId then 1
	                                                            when ub.IsPublic = 1 AND ub.UserId = @userId then 1 
	                                                            else 0
                                                            end) = 1", new { currentUserId, userId });
                return results.ToList();
            }
        }

        public bool AddNewUserBoard(UserBoardsDto input)
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
                                                    ,@IsPublic)", input);
                return result == 1;
            }
        }

        public bool UpdateUserBoard(UserBoardsDto userBoard)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Update UserBoard
                                            Set [UserId] = @UserId
                                                ,[BoardId] = @BoardId
                                                ,[IsPublic] = @IsPublic
                                            Where UserBoard.Id = @Id", userBoard);
                return result == 1;
            }
        }

        public bool DeleteUserBoard(int boardId)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Delete from UserBoard where BoardId = @boardId", new { boardId });
                return result == 1;
            }
        }
    }
}