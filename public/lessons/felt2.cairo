# As you saw in the previous lesson, the operator '/' does not denote
# truncated (i.e., rounding down) integer division as in other programming
# languages. Instead, one can use library functions such as
# unsigned_div_rem().
#
# Note that unsigned_div_rem() does not work for negative numbers.

%builtins output range_check

# Import unsigned_div_rem() from the math module.
from starkware.cairo.common.math import unsigned_div_rem
from starkware.cairo.common.serialize import serialize_word

func main{output_ptr : felt*, range_check_ptr}():
    let (q, r) = unsigned_div_rem(value=12, div=3)
    # Output the quotient (12 // 3).
    serialize_word(q)
    # Output the remainder (12 % 3).
    serialize_word(r)

    # Add code that outputs the quotient and remainder of 13 / 3 in addition to 12 / 3 here.

    return ()
end
