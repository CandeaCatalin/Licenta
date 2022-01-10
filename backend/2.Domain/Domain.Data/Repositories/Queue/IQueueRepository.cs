namespace Domain.Data.Repositories.Queue
{
    public interface IQueueRepository
    {
        int Create(int userId);
        void Delete(int queueId);
    }
}
