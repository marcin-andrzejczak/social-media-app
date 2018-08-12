using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using website.Exceptions;
using website.Helpers;
using website.Models;

namespace website.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        Task<User> GetById(string id);
        Task<User> Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }

    public class UserService : IUserService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly DataContext _dataContext;

        public UserService(SignInManager<User> signInManager, UserManager<User> userManager, DataContext dataContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _dataContext = dataContext;
        }

        public async Task<User> Authenticate(string email, string password)
        {
            var result = await _signInManager.PasswordSignInAsync(email, password, false, false);
            if( result.Succeeded )
            {
                return _userManager.Users.SingleOrDefault(r => r.Email == email);
            }
            return null;
        }

        public async Task<User> Create(User user, string password)
        {
            user.UserName = user.Email;
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                User u = await _userManager.FindByEmailAsync(user.Email);
                await _signInManager.SignInAsync(user, false);
                return _userManager.Users.SingleOrDefault(r => r.Email == user.Email);
            }

            return null;
        }

        public async void Delete(int id)
        {
            var user = _dataContext.Accounts.Find(id);
            if(user != null)
            {
                await _userManager.DeleteAsync(user);
            }
        }

        public IEnumerable<User> GetAll()
        {
            return _dataContext.Accounts;
        }

        public async Task<User> GetById(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async void Update(User userParam, string password = null)
        {
            var user = _dataContext.Accounts.Find(userParam.Id);

            if(user == null)
            {
                throw new AppException("User not found");
            }

            if(userParam.UserName != user.UserName)
            {
                if(_dataContext.Accounts.Any(x => x.UserName== userParam.UserName))
                {
                    throw new AppException("Username " + userParam.UserName + " is already taken");
                }
            }

            user.FirstName = userParam.FirstName;
            user.LastName = userParam.LastName;
            user.UserName = userParam.UserName;

            if (!string.IsNullOrWhiteSpace(password))
            {
                await _userManager.RemovePasswordAsync(user);
                await _userManager.AddPasswordAsync(user, password);
            }
            await _userManager.UpdateAsync(user);
        }
    }
}
