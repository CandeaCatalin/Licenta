CREATE PROCEDURE [dbo].[GetUsersQueue]
	@QueueId int
AS
BEGIN
		SELECT UTQ.[Id]
      ,UTQ.[UserId]
      ,UTQ.[PhysicalQueueId]
      ,UTQ.[TimeAdded]
      ,UTQ.[TimePassed]
      ,UTQ.[IsPassed]  FROM [dbo].UsersToQueues AS UTQ INNER JOIN [dbo].PhysicalQueues ON [dbo].PhysicalQueues.QueueId = @QueueId AND [dbo].PhysicalQueues.Id = UTQ.PhysicalQueueId WHERE UTQ.IsPassed = 0
END
GO
