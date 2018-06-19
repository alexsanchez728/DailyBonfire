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

        public ContentDto Post(ContentDto input)
        {
            using (var db = GetConnection())
            {
                db.Open();
                var result = db.Execute(@"Insert into Content 
                                                        ([Title]
                                                        ,[WebsiteDescription]
                                                        ,[Url])
                                                    Values
                                                        (@title
                                                        ,@WebsiteDescription
                                                        ,@url)", input);

                var createdContent = db.QueryFirstOrDefault<ContentDto>(@"select
                                                        top 1 *
                                                        from Content
                                                        order by Id DESC");
                return createdContent;
            }
        }

        public bool Put(ContentDto content)
        {
            using (var db = GetConnection())
            {
                var result = db.Execute(@"update content
                                                Set [Title] = @title
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