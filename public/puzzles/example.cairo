# [The Cairo Games Vol. 2](https://www.cairo-lang.org/the-cairo-games/puzzles2)
#
# The Cairo Games have ended. You can still try to solve the puzzles though!
#
# Below you'll find the example puzzle. The real puzzles can be found in
# the top-right corner under the "Cairo Games" menu.
#
# This is an example of a puzzle.
# If you try running this program, it will fail.
# Your goal is to make it run successfully, that's it!
# However, you are not allowed to change the Cairo instructions, only to
# add/modify [Hints](https://cairo-lang.org/docs/how_cairo_works/hints.html).
#
# Once the program runs successfully, make sure the PROGRAM HASH printed in
# the output pane is
#   0x00b9ddaae388f1f47ce7aacdf3b32fc7bea6b89834b3c59b7dc5462b0b7dcf61.
# If it isn't, you probably changed something other than a hint... (and it
# means that the solution will not be accepted).
#
# Note that the program allows you to write one output cell. Use it to output
# your Ethereum *GOERLI* key.
# Then, click on "Prove with SHARP". Once your Fact is accepted on-chain
# you will be able to register it in the competition contract,
# by sending a Goerli transaction.
# The full instructions are [here](https://www.cairo-lang.org/the-cairo-games/puzzles2).
# This puzzle is only an example, click on "The Cairo Games" in the top-right
# corner for the real puzzles.

%builtins output

func main{output_ptr : felt*}():
    alloc_locals
    local x
    local y
    %{
        # Use this Hint to set the (single) output cell of the program to
        # your Ethereum GOERLI key by changing the string
        # '0x123456789abcdef' to your key.
        memory[ids.output_ptr] = int('0x123456789abcdef', 16)
    %}
    assert x * y = 15
    assert x + y = 8
    let output_ptr = output_ptr + 1
    return ()
end
