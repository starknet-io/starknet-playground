%lang starknet
%builtins pedersen range_check

from starkware.cairo.common.cairo_builtins import HashBuiltin

# The simplest way to use your contract's storage is by defining storage variables.
# The following storage variable defines a map from user_id to balance.

@storage_var
func balance(user_id : felt) -> (res : felt):
end

# Let's write a @view function that retrieves the variable's value:

@view
func get_balance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    user_id : felt
) -> (res : felt):
    # To read from the storage variable use balance.read().
    let (current_balance) = balance.read(user_id=user_id)
    return (res=current_balance)
end

# The following function increases the balance of the given user_id by the
# given amount (note that we don't check that amount is positive).
#
# Complete the missing line and deploy the contract.
# You can interact with it using [Starkscan](https://testnet.starkscan.co/).
@external
func increase_balance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    user_id : felt, amount : felt
):
    # Use balance.read to read the current balance into current_balance.
    # WRITE YOUR CODE HERE.

    # To write to the storage variable use balance.write()
    # and provide the new value as the last argument.
    balance.write(user_id=user_id, value=current_balance + amount)

    return ()
end
