using DailyBonfireProject.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace DailyBonfireProject.Services
{
    public class UsersRepository
    {
        private IConfiguration _config;

        public UsersRepository(IConfiguration config)
        {
            _config = config;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_config["ConnectionStrings:Bonfire"]);
        }

        public List<UsersDto> Get()
        {
            using (var db = GetConnection())
            {
                db.Open();
                var results = db.Query<UsersDto>(@"select * from [user]");

                return results.ToList();
            }
        }

        public UsersDto GetById(int id)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.QueryFirstOrDefault<UsersDto>(@"select * from [user] where id = @id", new { id });

                return result;
            }
        }

        public bool AddNewUser(object input)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Insert into [User]
                                                    ([Name]
                                                    ,[Bio])
                                                Values
                                                    (@name
                                                    ,@bio)", input);
                return result == 1;
            }
        }

        public bool UpdateUser(UsersDto user)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Update [User]
                                            Set [Name] = @name
                                                ,[Bio] = @bio
                                            Where Id = @id", user);
                return result == 1;
            }
        }

        public bool DeleteUser(int id)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"delte from [user] where id = @id", new { id });

                return result == 1;
            }
        }
    }
}