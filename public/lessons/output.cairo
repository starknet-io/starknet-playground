// The following code outputs the numbers 100, 200, 300.
// 1. Click on "Run" to see the output.
// 2. Change it to output 400 as well.

// Use the output builtin.
%builtins output

// Import the serialize_word() function.
from starkware.cairo.common.serialize import serialize_word

func main{output_ptr: felt*}() {
    // Output 100 by calling serialize_word.
    serialize_word(100);
    // Output 200.
    serialize_word(200);
    // Output 300.
    serialize_word(300);
    // Return.
    return ();
}
