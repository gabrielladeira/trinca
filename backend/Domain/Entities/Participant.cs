namespace TrincaBarbecueApi.Domain.Entities
{
    public class Participant
    {
        public string Name { get; set; }
        public double ValueToPay { get; set; }
        public bool Paid { get; set; }
        public bool WillDrink { get; set; }
        public string Observations { get; set; }
    }
}