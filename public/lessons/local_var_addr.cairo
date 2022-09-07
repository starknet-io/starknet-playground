// When Cairo needs to retrieve the *address* of a local variable,
// it needs to be told the value of the frame pointer register, fp
// (see [here](https://cairo-lang.org/docs/how_cairo_works/functions.html#fp-register)).
//
// This can be done by setting a reference named __fp__ to the value, which
// can be obtained using the library function get_fp_and_pc().
//
// 1. Try to run the code as-is, and make sure you understand the error.
// 2. Uncomment the line setting __fp__, and run again.
//    The code should now work and you should be able to see that x was set
//    to 1234.
// 3. Uncomment the line calling foo() and try to run the code.
//    Fix the code by adding exactly one word to it.
//    Hint: Revisit the "Revoked references" challenge.

from starkware.cairo.common.registers import get_fp_and_pc

// Returns a^3 for a != 0 and 1 otherwise.
func foo(a) -> (res: felt) {
    if (a == 0) {
        return (res=1);
    } else {
        return (res=a * a * a);
    }
}

func main() -> () {
    alloc_locals;

    // let (__fp__, _) = get_fp_and_pc();
    local x: felt;
    // let (res) = foo(a=10);
    local y: felt* = &x;
    assert [y] = 1234;
    return ();
}
