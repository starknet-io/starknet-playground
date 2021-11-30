# The following code outputs the 9th power of 2.
# 1. Click on "Debug" to run the code, and then click on
#    the arrows in the memory panel to trace the program
#    step by step.
#
# Observe that the computation of `z` take 8 steps and
# creates 8 temporary variables. This is because `let`
# simply replaces each instance of `y` with `x * x * x`
# and each instance of `z` with `y * y * y`, which is
# expanded to nine multiplications.
#
# 2. Change the two `let`s to `tempvar`s and run the program.
#
# "tempvar" stands for "temporary variable", which means that
# a variable will be allocated for the intermediate values
# (`x * x * x` and `y * y * y`). This reduces the same
# computation to use only 4 steps and 2 new variables.
#
# 3. Replace all three instance of the keyword `tempvar`
#    with `local`, uncomment the line containing `alloc_locals`
#    and run the code again.
#
# The behavior of the code doesn't change. This is because
# the keyword `local` allocates a new variables for the
# intermediate values as well. The main difference between
# `local` and `tempvar` is explained in the next lesson.

# Use the output builtin.
%builtins output

# Import the serialize_word() function.
from starkware.cairo.common.serialize import serialize_word

# Outputs the value 2^9.
func main{output_ptr : felt*}():
    # alloc_locals
    tempvar x = 2
    let y = x * x * x
    let z = y * y * y
    # Because of the `let`s, the following line is equivalent to
    # serialize_word(x * x * x * x * x * x * x * x * x).
    serialize_word(z)
    return ()
end
