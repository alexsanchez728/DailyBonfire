using DailyBonfireProject.Models;
using DailyBonfireProject.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BonfireApi.Controllers
{
    [Produces("application/json")]
    [Route("api/content")]
    public class ContentController : Controller
    {
        readonly ContentRepository _repo;

        public ContentController(ContentRepository repo)
        {
            _repo = repo;
        }

        // POST api/content
        [HttpPost]
        public bool Post(object input)
        {
            return _repo.Post(input);
        }

        // PUT api/content/5
        [HttpPut("{id}")]
        public bool Put(ContentDto content)
        {
            return _repo.Put(content);
        }

        // DELETE api/content/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return _repo.Delete(id);
        }
    }
}
