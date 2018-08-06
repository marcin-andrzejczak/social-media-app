using Microsoft.EntityFrameworkCore;
using website.Models;

namespace website.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DbSet<ReactionType> ReactionTypes { get; set; }
        public DbSet<Media> Medias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasOne(u => u.ProfilePicture);
            modelBuilder.Entity<User>().HasMany(u => u.Medias).WithOne(m => m.User);
            modelBuilder.Entity<User>().HasMany(u => u.Posts).WithOne(p => p.User);
            modelBuilder.Entity<User>().HasMany(u => u.Comments).WithOne(c => c.User);
           // modelBuilder.Entity<User>().HasMany(u => u.Reactions).WithOne(r => r.User);

            modelBuilder.Entity<Post>().HasOne(p => p.User).WithMany(u => u.Posts);
            modelBuilder.Entity<Post>().HasMany(p => p.Medias).WithOne(m => m.Post);
            modelBuilder.Entity<Post>().HasMany(p => p.Comments).WithOne(c => c.Post);
           // modelBuilder.Entity<Post>().HasMany(p => p.Reactions).WithOne(r => (Post) r.Entry);

            modelBuilder.Entity<Comment>().HasOne(c => c.Post).WithMany(p => p.Comments);
            modelBuilder.Entity<Comment>().HasOne(c => c.User).WithMany(u => u.Comments);
            //modelBuilder.Entity<Comment>().HasMany(c => c.Reactions).WithOne(r => (Comment) r.Entry);

            modelBuilder.Entity<Media>().HasOne(m => m.User).WithMany(u => u.Medias);
            modelBuilder.Entity<Media>().HasOne(m => m.Post).WithMany(p => p.Medias);

            //modelBuilder.Entity<Reaction>().HasOne(r => r.User).WithMany(u => u.Reactions);
            //modelBuilder.Entity<Reaction>().HasOne(r => r.Entry).WithMany(e => e.Reactions);
            modelBuilder.Entity<Reaction>().HasOne(r => r.ReactionType).WithMany(rt => rt.Reactions);
            modelBuilder.Entity<Reaction>().HasKey(r => new { r.UserID, r.EntryID });
        }
    }
}
