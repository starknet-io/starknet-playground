# The following code prints the sum of the numbers from 1 to 10.
# Modify the function `compute_sum` to print all the intermediate sums:
# 1, 1 + 2, 1 + 2 + 3, ..., 1 + 2 + ... + 10.
# Note: you'll have to add the implicit argument output_ptr to the
# declaration of compute_sum (in order to use the serialize_word function):
#   func compute_sum{output_ptr : felt*}(n : felt) -> (sum : felt):

# Use the output builtin.
%builtins output

from starkware.cairo.common.serialize import serialize_word

func compute_sum(n : felt) -> (sum : felt):
    if n == 0:
        # When 0 is reached, return 0.
        return (sum=0)
    end

    # Otherwise, call `compute_sum` recursively to compute 1 + 2 + ... + (n-1)
    let (sum) = compute_sum(n=n - 1)
    # Add the new value `n` to the sum.
    let new_sum = sum + n
    return (sum=new_sum)
end

func main{output_ptr : felt*}():
    let (res) = compute_sum(n=10)

    # Output the result.
    serialize_word(res)
    return ()
end
