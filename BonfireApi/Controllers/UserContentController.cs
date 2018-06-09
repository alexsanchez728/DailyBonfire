using System.Collections.Generic;
using DailyBonfireProject.Models;
using DailyBonfireProject.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BonfireApi.Controllers
{
    [Produces("application/json")]
    [Route("api/UserContent")]
    public class UserContentController : Controller
    {
        readonly UserContentRepository _repo;

        public UserContentController(UserContentRepository repo)
        {
            _repo = repo;
        }
        // GET: api/UserContent/5
        [HttpGet("{id}", Name = "GetContentVisibleToYou")]
        public List<ContentDisplayDto> Get(int userId)
        {
            return _repo.GetContentVisibleToYou(userId);
        }

        // GET: api/UserContent/content/5
        [HttpGet("content/{id}", Name = "GetContentById")]
        public ContentDisplayDto GetById(int id)
        {
            return _repo.GetById(id);
        }

        // GET: api/UserContent/see/[currentUserId]/[userId]
        [HttpGet]
        [Route("see/{currentUserId}/{userId}", Name = "GetContentByUserId")]
        public List<ContentDisplayDto> GetByUserId(int currentUserId, int userId)
        {
            return _repo.GetByUserId(currentUserId, userId);
        }

        // POST: api/UserContent
        [HttpPost]
        public bool Post([FromBody]object input)
        {
            return _repo.Post(input);
        }
        
        // PUT: api/UserContent/5
        [HttpPut("{id}")]
        public bool Put([FromBody]UserContentDto userContent)
        {
            return _repo.Put(userContent);
        }
        
        // DELETE: api/UserContent/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return _repo.Delete(id);
        }
    }
}
