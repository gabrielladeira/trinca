using MongoDB.Driver;

using TrincaBarbecueApi.Domain;

namespace TrincaBarbecueApi.Data
{
    public interface IDbConnection
    {
        /// <summary>
        /// Gets a MongoDB database.
        /// </summary>
        /// <returns></returns>
        IMongoDatabase Get();
    }

    /// <summary>
    /// Implements the IDbConnection interfaces.
    /// </summary>
    public class DbConnection : IDbConnection
    {
        private readonly IDatabaseSettings _databaseSettings;
        private IMongoDatabase _database;

        public DbConnection(IDatabaseSettings databaseSettings)
        {
            _databaseSettings = databaseSettings;
        }

        public IMongoDatabase Get()
        {
            return this._database ?? (this._database = this.GetDatabase());
        }

        /// <summary>
        /// Get the application's database.
        /// </summary>
        /// <returns>A mongodb database definition.</returns>
        private IMongoDatabase GetDatabase()
        {
            var client = new MongoClient(_databaseSettings.ConnectionString);
            return client.GetDatabase(_databaseSettings.DatabaseName);
        }
    }
}