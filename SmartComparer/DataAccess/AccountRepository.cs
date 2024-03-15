using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SmartComparer.DataAccess;
using System.Runtime.InteropServices;

public class AccountRepository : RepositoryBase<Account>
{
    public AccountRepository(FinancialContext context) : base(context, null)
    {
    }

    public async Task<Account> GetAccountWithTransactionsAsync(int accountId)
    {
        var financialContext = RepositoryContext as FinancialContext;
        if (financialContext == null)
        {
            throw new InvalidOperationException("Context is not of type FinancialContext.");
        }

        return await financialContext.Accounts
            .Include(a => a.Transactions)
            .FirstOrDefaultAsync(a => a.ID == accountId);
    }
}


//[ApiController]
//[Route("[controller]")]
//public class AccountsController : ControllerBase
//{
//    private readonly AccountRepository _accountRepository;

//    public AccountsController(AccountRepository accountRepository)
//    {
//        _accountRepository = accountRepository;
//    }

//    [HttpGet("{id}")]
//    public async Task<ActionResult<Account>> GetAccountWithTransactions(int id)
//    {
//        var account = await _accountRepository.GetAccountWithTransactionsAsync(id);
//        if (account == null)
//        {
//            return NotFound();
//        }
//        return account;
//    }
//}

