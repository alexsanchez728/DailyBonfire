using DailyBonfireProject.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace DailyBonfireProject.Services
{
    public class ContentRepository
    {
        private IConfiguration _config;

        public ContentRepository(IConfiguration config)
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
                var result = db.Execute(@"Insert into Content 
                                                        ([Title]
                                                        ,[SiteDescription]
                                                        ,[Url])
                                                    Values
                                                        (@title
                                                        ,@siteDescription
                                                        ,@url)", input);
                return result == 1;
            }
        }

        public bool Put(ContentDto content)
        {
            using (var db = GetConnection())
            {
                var result = db.Execute(@"update content
                                                Set [Title] = @title
                                                    ,[SiteDescription] = @siteDescription
                                                    ,[Url] = @url
                                                Where id = @id", content);
                return result == 1;
            }
        }

        public bool Delete(int id)
        {
            using (var db = GetConnection())
            {
                var result = db.Execute(@"delete from Content where id = @id", new { id });
                return result == 1;
            }
        }

    }
}