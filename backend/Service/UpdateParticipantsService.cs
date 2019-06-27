using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;

using TrincaBarbecueApi.Domain.Entities;
using TrincaBarbecueApi.Data.Repository;

namespace TrincaBarbecueApi.Service
{
    public class UpdateParticipantsService
    {
        private readonly BarbecueRepository _barbecueRepository;

        public UpdateParticipantsService(BarbecueRepository barbecueRepository)
        {
            _barbecueRepository = barbecueRepository;
        }

        public Barbecue Run(string barbecueId, Participant[] participants)
        {
            var barbecue = _barbecueRepository.FindOne(barbecueId);

            if (barbecue == null)
            {
                throw new ArgumentException("Churrasco não encontrado");
            }

            var update = Builders<Barbecue>.Update.Set(x => x.Participants, participants);

            _barbecueRepository.Update(barbecueId, update);

            return barbecue;
        }
    }
}