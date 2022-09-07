// Dynamic allocation in Cairo is done using the `alloc` function,
// which itself is implemented in Cairo using the
// [segments](https://www.cairo-lang.org/docs/how_cairo_works/segments.html) mechanism.
// Thanks to this mechanism, `alloc` allocates an array of an arbitrary size,
// which does not need to be specified in the call.
//
// The function `sqr_array` should compute and return an array
// of the square values of a given array.
// Write the body of `sqr_array` using the given helper function
// `_inner_sqr_array` and check that the program output
// is 1, 4, 9, 16.
// `sqr_array` should allocate the new array it returns.

// Use the output builtin.
%builtins output

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.serialize import serialize_word

// Fills `new_array` with the squares of the first `length` elements in `array`.
func _inner_sqr_array(array: felt*, new_array: felt*, length: felt) {
    if (length == 0) {
        return ();
    }

    assert [new_array] = [array] * [array];

    _inner_sqr_array(array=array + 1, new_array=new_array + 1, length=length - 1);
    return ();
}

func sqr_array(array: felt*, length: felt) -> (new_array: felt*) {
    // Write your code here.
}

func main{output_ptr: felt*}() {
    alloc_locals;
    // Allocate a new array.
    let (local array) = alloc();
    // Fill the new array with field elements.
    assert [array] = 1;
    assert [array + 1] = 2;
    assert [array + 2] = 3;
    assert [array + 3] = 4;

    let (new_array) = sqr_array(array=array, length=4);
    serialize_word([new_array]);
    serialize_word([new_array + 1]);
    serialize_word([new_array + 2]);
    serialize_word([new_array + 3]);

    return ();
}
