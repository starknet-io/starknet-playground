// The program below lets you to choose a number x and output its square y = x*x
// (proving that you know the square root of y).
//
// 1. Replace "YOUR_NUMBER" with a value of your choice, run the program and
//    make sure you get the expected output (the square of the value you chose).
//
// Take a look at the output line saying "Program hash: ...".
// The program hash is the (Pedersen) hash of the compiled program.
//
// 2. The compiled program does not include the [hints](https://cairo-lang.org/docs/how_cairo_works/hints.html),
//    so changing any code within a hint does not change the resulting program
//    hash.
//    Try changing x to a different number and note that the program hash remains
//    unchanged after rerunning.
//
// The Cairo SHARP collects several programs and creates a proof that they ran
// successfully. Such a batch of programs is called a "train".
// Note that it may take a while until a train is created, as the service waits
// to collect enough programs (after a certain amount of time, the train will
// be dispatched, even if it's not full).
//
// 3. Click on "Prove with SHARP" to prove the program using the shared proving service.
//
// After the proof is created, SHARP sends it to an [Ethereum goerli contract](https://goerli.etherscan.io/address/0xAB43bA48c9edF4C2C4bB01237348D1D7B28ef168).
// For each job in the train, a corresponding fact is registered on the contract,
// attesting to the validity of the run with its particular output.
//
// 4. You can monitor the status of your job, using the link in the output pane.
//
// For each job the corresponding fact is computed as follows:
//   keccak(program_hash, keccak(program_output))
// where:
// * program_hash is the hash of the compiled program, which you can find in
//   the output pane (32 bytes).
// * program_output is the output of the program as a list of 32-byte
//   elements.
//
// For example, if you chose x=3, the output will be [9] and you can compute
// the fact in Python using:
//
//   from web3 import Web3
//
//   program_hash = 0x114952172aed91e59f870a314e75de0a437ff550e4618068cec2d832e48b0c7
//   program_output = [9]
//   Web3.solidityKeccak(['uint256', 'bytes32'], [
//     program_hash,
//     Web3.solidityKeccak(['uint256[]'], [program_output])
//   ])
//
// You can also find your job's fact in SHARP tracking page you opened
// in step 4.
//
// 5. Once you see that the fact is registered, you can call the
//    [contract's isValid() method](https://goerli.etherscan.io/address/0xAB43bA48c9edF4C2C4bB01237348D1D7B28ef168#readContract) to make sure it's indeed registered.

%builtins output

from starkware.cairo.common.serialize import serialize_word

func main{output_ptr: felt*}() {
    alloc_locals;
    local x;
    %{ ids.x = YOUR_NUMBER %}

    serialize_word(x * x);
    return ();
}
