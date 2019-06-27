using System;
using System.Collections.Generic;

namespace TrincaBarbecueApi.Domain.Entities
{
    public class Barbecue : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Observations { get; set; }
        public DateTime ScheduledTo { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public IEnumerable<Participant> Participants { get; set; }
        public double SuggestedPriceWithDrinks { get; set; }
        public double SuggestedPriceWithouDrinks { get; set; }

        public Barbecue()
        {
            Participants = new List<Participant>();
        }
    }
}
