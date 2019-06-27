using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

using TrincaBarbecueApi.Domain.Entities;
using TrincaBarbecueApi.Data.Repository;
using TrincaBarbecueApi.Service;

namespace TrincaBarbecueApi.Application.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BarbecueController : ControllerBase
    {
        private readonly BarbecueRepository _barbecueRepository;
        private readonly GetNextBarbecueService _getNextBarbecueService;
        private readonly ScheduleBarbecueService _scheduleBarbecueService;
        private readonly AddParticipantService _addParticipantService;
        private readonly UpdateParticipantsService _updateParticipantsService;

        public BarbecueController(
            BarbecueRepository barbecueRepository,
            GetNextBarbecueService getNextBarbecueService,
            ScheduleBarbecueService scheduleBarbecueService,
            AddParticipantService addParticipantService,
            UpdateParticipantsService updateParticipantsService) : base()
        {
            _barbecueRepository = barbecueRepository;
            _getNextBarbecueService = getNextBarbecueService;
            _scheduleBarbecueService = scheduleBarbecueService;
            _addParticipantService = addParticipantService;
            _updateParticipantsService = updateParticipantsService;
        }

        // GET api/barbecue
        [HttpGet]
        public ActionResult<IEnumerable<Barbecue>> Get()
        {
            try
            {
                return _getNextBarbecueService.Run().ToArray();
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // GET barbecue/5
        [HttpGet("{id}")]
        public ActionResult<Barbecue> Get(string id)
        {
            try
            {
                var barbecueSchedule = _barbecueRepository.FindOne(id);
                if (barbecueSchedule == null)
                {
                    return NotFound();
                }

                return new ObjectResult(barbecueSchedule);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // POST barbecue
        [HttpPost]
        public IActionResult Post([FromBody] Barbecue barbecue)
        {
            try
            {
                return new ObjectResult(_scheduleBarbecueService.Run(barbecue));
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // POST barbecue/<id>/participants
        [HttpPost("{id}/participants")]
        public IActionResult Post(string id, [FromBody] Participant participant)
        {
            try
            {
                return new ObjectResult(_addParticipantService.Run(id, participant));
            }
            catch (ArgumentException error)
            {
                return NotFound(error);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // PUT barbecue/<id>/participants
        [HttpPut("{id}/participants")]
        public IActionResult Put(string id, [FromBody] Participant[] participants)
        {
            try
            {
                
                return new OkObjectResult(_updateParticipantsService.Run(id, participants));
            }
            catch (ArgumentException error)
            {
                return NotFound(error);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // DELETE barbecue/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
        }
    }
}
