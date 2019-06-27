using System;
using System.Collections.Generic;
using System.Linq;

using TrincaBarbecueApi.Domain.Entities;
using TrincaBarbecueApi.Data.Repository;

namespace TrincaBarbecueApi.Service
{
    public class GetNextBarbecueService
    {
        private readonly BarbecueRepository _barbecueRepository;
        
        public GetNextBarbecueService(BarbecueRepository barbecueRepository) {
            _barbecueRepository = barbecueRepository;
        }

        public IEnumerable<Barbecue> Run()
        {
            return _barbecueRepository.Find().Where(barbecue => barbecue.ScheduledTo.Date >= DateTime.Today);
        }
    }
}