using DailyBonfireProject.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace DailyBonfireProject.Services
{
    public class BoardsRepository
    {
        private IConfiguration _config;

        public BoardsRepository(IConfiguration config)
        {
            _config = config;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_config["ConnectionStrings:Bonfire"]);
        }
        public BoardsDto AddNewBoard(BoardsDto input)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Insert into boards 
                                                        ([Title]
                                                        ,[DescriptionFromUser])
                                                    Values
                                                        (@Title
                                                        ,@DescriptionFromUser)", input);
                var createdBoard = db.QueryFirstOrDefault<BoardsDto>(@"select
                                                        top 1 *
                                                        from boards
                                                        order by Id DESC");
                return createdBoard;
            }
        }

        public bool UpdateBoard(BoardsDto board)
        {
            using (var db = GetConnection())
            {
                var result = db.Execute(@"update boards
                                                Set [Title] = @title
                                                    ,[DescriptionFromUser] = @DescriptionFromUser
                                                Where id = @id", board);
                return result == 1;
            }
        }

        public bool DeleteBoard(int boardId)
        {
            using (var db = GetConnection())
            {
                var result = db.Execute(@"delete from boards where id = @boardId", new { boardId });
                return result == 1;
            }
        }
    }
}