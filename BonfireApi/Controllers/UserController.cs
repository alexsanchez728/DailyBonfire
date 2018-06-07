using System.Collections.Generic;
using DailyBonfireProject.Models;
using DailyBonfireProject.Services;
using Microsoft.AspNetCore.Mvc;

namespace BonfireApi.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        readonly UsersRepository _repo;

        public UserController(UsersRepository repo)
        {
            _repo = repo;
        }

        // GET: api/User
        [HttpGet]
        public List<UsersDto> Get()
        {
            return _repo.Get();
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "GetById")]
        public UsersDto GetById(int id)
        {
            return _repo.GetById(id);
        }
        
        // POST: api/User
        [HttpPost]
        public bool Post([FromBody]object input)
        {
            return _repo.Post(input);
        }
        
        // PUT: api/User/5
        [HttpPut("{id}")]
        public bool Put([FromBody]UsersDto user)
        {
            return _repo.Put(user);
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return _repo.Delete(id);
        }
    }
}
