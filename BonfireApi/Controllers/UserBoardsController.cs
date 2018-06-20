using System.Collections.Generic;
using DailyBonfireProject.Models;
using DailyBonfireProject.Services;
using Microsoft.AspNetCore.Mvc;

namespace BonfireApi.Controllers
{
    [Produces("application/json")]
    [Route("api/UserBoards")]
    public class UserBoardsController : Controller
    {
        readonly UserBoardsRepository _repo;

        public UserBoardsController(UserBoardsRepository repo)
        {
            _repo = repo;
        }

        // GET: api/UserBoards/visible/5
        [HttpGet("visible/{userId}", Name = "GetAllPublicAndYourPrivateBoards")]
        public List<BoardDisplayDto> Getvisible(int userId)
        {
            return _repo.GetContentVisibleToYou(userId);
        }

        // GET: api/UserBoards/5
        [HttpGet("{id}", Name = "GetUserBoardsByBoardId")]
        public BoardDisplayDto Get(int id)
        {
            return _repo.GetById(id);
        }

        // GET: api/UserBoards/By/[currentUserId]/[boardId]
        [HttpGet("By/{currentUserId}/{boardId}", Name = "GetUserBoardByUserIdAndBoardId")]
        public BoardDisplayDto GetByUserAndBoardId(int currentUserId, int boardId)
        {
            return _repo.GetByUserAndBoardId(currentUserId, boardId);
        }


        // GET: api/UserBoards/[currentUserId]/[userId]
        [HttpGet("{currentUserId}/{userId}", Name = "GetUserBoardsByUserId")]
        public List<BoardDisplayDto> GetByUserId(int currentUserId, int UserId)
        {
            return _repo.GetByUserId(currentUserId, UserId);
        }

        // POST: api/UserBoards
        [HttpPost]
        public bool Post([FromBody]UserBoardsDto input)
        {
            return _repo.AddNewUserBoard(input);
        }
        
        // PUT: api/UserBoards/5
        [HttpPut("{id}")]
        public bool Put([FromBody]UserBoardsDto userBoard)
        {
            return _repo.UpdateUserBoard(userBoard);
        }
        
        // DELETE: api/UserBoards/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return _repo.DeleteUserBoard(id);
        }
    }
}
