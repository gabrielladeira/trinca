using MongoDB.Driver;

using TrincaBarbecueApi.Domain.Entities;

namespace TrincaBarbecueApi.Data.Repository
{
    public class BarbecueRepository : BaseRepository<Barbecue>
    {
        private readonly IDbConnection _dbConnection;
        public BarbecueRepository(IDbConnection dbConnection) {
            _dbConnection = dbConnection;
        }
        protected override IMongoDatabase GetDatabase()
        {
            return _dbConnection.Get();
        }

        protected override string GetCollectionName()
        {
            return "barbecue_schedules";
        }
    }
}