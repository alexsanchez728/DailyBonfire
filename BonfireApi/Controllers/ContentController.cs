using DailyBonfireProject.Models;
using DailyBonfireProject.Services;
using Microsoft.AspNetCore.Mvc;

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
        public ContentDto Post([FromBody]ContentDto input)
        {
            return _repo.AddNewContent(input);
        }

        // PUT api/content/5
        [HttpPut("{id}")]
        public bool Put(ContentDto content)
        {
            return _repo.UpdateContent(content);
        }

        // DELETE api/content/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return _repo.DeleteContent(id);
        }
    }
}
