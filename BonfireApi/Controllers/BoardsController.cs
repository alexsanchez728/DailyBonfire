using DailyBonfireProject.Models;
using DailyBonfireProject.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BonfireApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Boards")]
    public class BoardsController : Controller
    {
        readonly BoardsRepository _repo;

        public BoardsController(BoardsRepository repo)
        {
            _repo = repo;
        }

        // POST: api/Boards
        [HttpPost]
        public BoardsDto Post([FromBody]BoardsDto input)
        {
            return _repo.Post(input);

        }
        
        // PUT: api/Boards/5
        [HttpPut("{id}")]
        public bool Put([FromBody]BoardsDto board)
        {
            return _repo.Put(board);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return _repo.Delete(id);
        }
    }
}
