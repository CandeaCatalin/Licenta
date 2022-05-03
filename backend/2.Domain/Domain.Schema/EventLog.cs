using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Schema
{
    public class EventLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Value { get; set; }
        public int EventCategoryId { get; set; }

        public EventCategory EventCategory { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
