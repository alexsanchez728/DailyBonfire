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
        public bool Post(object input)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Insert into boards 
                                                        ([Title]
                                                        ,[DescriptionFromSite]
                                                    Values
                                                        (@title
                                                        ,@DescriptionFromSite)", input);
                return result == 1;
            }
        }

        public bool Put(BoardsDto boards)
        {
            using (var db = GetConnection())
            {
                var result = db.Execute(@"update boards
                                                Set [Title] = @title
                                                    ,[DescriptionFromSite] = @DescriptionFromSite", boards);
                return result == 1;
            }
        }

        public bool Delete(int id)
        {
            using (var db = GetConnection())
            {
                var result = db.Execute(@"delete from boards where id = @id", new { id });
                return result == 1;
            }
        }
    }
}