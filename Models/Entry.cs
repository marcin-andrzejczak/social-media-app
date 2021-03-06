﻿using System.Collections.Generic;

namespace website.Models
{
    public abstract class Entry
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public User User { get; set; }
        public List<Reaction> Reactions { get; set; }

    }
}
