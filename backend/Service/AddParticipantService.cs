using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;

using TrincaBarbecueApi.Domain.Entities;
using TrincaBarbecueApi.Data.Repository;

namespace TrincaBarbecueApi.Service
{
    public class AddParticipantService
    {
        private readonly BarbecueRepository _barbecueRepository;

        public AddParticipantService(BarbecueRepository barbecueRepository)
        {
            _barbecueRepository = barbecueRepository;
        }

        public Barbecue Run(string barbecueId, Participant participant)
        {
            var barbecue = _barbecueRepository.FindOne(barbecueId);

            if (barbecue == null)
            {
                throw new ArgumentException("Churrasco não encontrado");
            }

            if (barbecue.Participants.Any(x => x.Name.Equals(participant.Name, StringComparison.InvariantCultureIgnoreCase)))
            {
                throw new Exception("Participante já cadastrado");
            }

            var participants = barbecue.Participants.ToList();
            participants.Add(participant);

            var update = Builders<Barbecue>.Update.Set(x => x.Participants, participants);

            _barbecueRepository.Update(barbecueId, update);

            return barbecue;
        }
    }
}