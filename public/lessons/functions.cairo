# The following code is missing the function `add1`.
# 1. Click on "Run" to see the error.
# 2. Write the function `add1`, based on `add1_square`, so
#    that the program terminates successfully.
#
# Note that `add1` doesn't have to call other functions.
#
# You can learn more about functions [here](https://www.cairo-lang.org/docs/how_cairo_works/functions.html).

# Write your code here.

func add1_square(x : felt) -> (x : felt):
    # Call `add1` and unpack the result into `z`.
    let (z) = add1(y=x)
    return (x=z * z)
end

func main():
    # Call `add1_square` and save the result into `res`.
    let (res) = add1_square(x=12)

    # Verify the computation.
    assert res = (12 + 1) * (12 + 1)
    return ()
end
