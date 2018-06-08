using DailyBonfireProject.Models;
using DailyBonfireProject.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BonfireApi.Controllers
{
    [Produces("application/json")]
    [Route("api/content")]
    [EnableCors("BonfirePolicy")]
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
