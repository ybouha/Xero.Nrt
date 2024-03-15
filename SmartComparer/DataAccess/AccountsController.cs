using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartComparer.Models; // Update this using directive based on your project structure
using SmartComparer.Data; // Update this based on where FinancialContext or Repository is located
using System.Runtime.InteropServices;


namespace SmartComparer.DataAccess
{

    namespace YourNamespace.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class AccountsController : ControllerBase
        {
            private readonly IRepositoryBase<Account> _accountRepository;

            public AccountsController(IRepositoryBase<Account> accountRepository)
            {
                _accountRepository = accountRepository;
            }

            // GET: api/Accounts
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
            {
                return Ok(await _accountRepository.GetAllAsync());
            }

            // GET: api/Accounts/5
            [HttpGet("{id}")]
            public async Task<ActionResult<Account>> GetAccount(int id)
            {
                var account = await _accountRepository.GetOneAsync(id);

                if (account == null)
                {
                    return NotFound();
                }

                return account;
            }

            // POST: api/Accounts
            [HttpPost]
            public async Task<ActionResult<Account>> PostAccount(Account account)
            {
                await _accountRepository.CreateAsync(account);
                return CreatedAtAction("GetAccount", new { id = account.ID }, account);
            }

            // PUT: api/Accounts/5
            [HttpPut("{id}")]
            public async Task<IActionResult> PutAccount(int id, Account account)
            {
                if (id != account.ID)
                {
                    return BadRequest();
                }

                try
                {
                    await _accountRepository.UpdateAsync(account);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!(await AccountExists(id)))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            // DELETE: api/Accounts/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteAccount(int id)
            {
                var account = await _accountRepository.GetOneAsync(id);
                if (account == null)
                {
                    return NotFound();
                }

                await _accountRepository.DeleteAsync(account);
                return NoContent();
            }

            private async Task<bool> AccountExists(int id)
            {
                var account = await _accountRepository.GetOneAsync(id);
                return account != null;
            }

            // GET: api/Accounts/FindByName/{name}
            [HttpGet("FindByName/{name}")]
            public async Task<ActionResult<IEnumerable<Account>>> FindAccountsByName(string name)
            {
                var accounts = await _accountRepository.GetByConditionAsync(account => account.Name.Contains(name));
                return Ok(accounts);
            }


            // GET: api/Accounts/FindByAmountRange/{minAmount}/{maxAmount}
            [HttpGet("FindByAmountRange/{minAmount}/{maxAmount}")]
            public async Task<ActionResult<IEnumerable<Account>>> FindAccountsByAmountRange(decimal minAmount, decimal maxAmount)
            {
                var accounts = await _accountRepository.GetByConditionAsync(account => account.Amount >= minAmount && account.Amount <= maxAmount);
                return Ok(accounts);
            }


        }
    }

}
