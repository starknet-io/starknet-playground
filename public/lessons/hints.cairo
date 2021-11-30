# The following function uses hints to efficiently compute the square root `res`
# of the argument `n`.
# The idea is that the verifier only needs to be convinced that res * res = n,
# it doesn't really care how res was computed.
# In such cases, we don't have to compute res in pure Cairo - we can write a
# piece of python code inside the Cairo program, which is called a "hint".
# A hint is a piece of code that the prover runs to initialize
# some memory cells. Note that it is completely transparent from the verifier's
# point of view, so the result of the hint *must* be verified using pure Cairo
# instructions (e.g., the "assert n = res * res" instruction below).
#
# 1. Comment out the line "assert n = res * res" and run the code. Does it still output
#    the expected value? Can you explain why the assert is nonetheless essential?
#    Hint: Recall that from the verifier's point of view, the hint does not exist.
# 2. Uncomment the assert line and change the function to compute the fourth
#    root.

%builtins output

from starkware.cairo.common.serialize import serialize_word

# Computes the square root (over the integers) of `n`.
# Prover assumption: The square root exists.
func sqrt(n) -> (res):
    alloc_locals
    local res

    # Set the value of res using a python hint.
    %{
        import math

        # Use the ids variable to access the value of a Cairo variable.
        ids.res = int(math.sqrt(ids.n))
    %}

    # From the verifier's point of view, the hint is completely transparent.
    # The following line guarantees that `res` is the square root
    # (either the positive or negative) of `n`.
    assert n = res * res
    return (res=res)
end

func main{output_ptr : felt*}():
    let (res) = sqrt(256)
    serialize_word(res)
    return ()
end
