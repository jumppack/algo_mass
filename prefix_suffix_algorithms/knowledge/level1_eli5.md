# Level 1: The Magic Notebook (ELI5)

Imagine you have a row of piggy banks on a shelf. Each piggy bank has some coins in it.

`[ 2 coins, 3 coins, 1 coin, 5 coins ]`

Now, suppose I keep asking you questions like: 
*"How many coins are in the first 3 piggy banks?"*
*"How many coins are in piggy banks 2 to 4?"*

If you just look at them one by one every time I ask, it takes a long time. You have to count: "2 plus 3 is 5... plus 1 is 6..." for every single question!

## The Magic Trick (Prefix Sum)

Instead of counting every time, you make a **Magic Notebook**. 
In this notebook, you write down the total number of coins from the *start* up to *that* piggy bank.

1. First bank has 2. Total so far: **2**. (Write 2)
2. Next has 3. Total is 2 + 3 = **5**. (Write 5)
3. Next has 1. Total is 5 + 1 = **6**. (Write 6)
4. Next has 5. Total is 6 + 5 = **11**. (Write 11)

Your notebook looks like this: `[ 2, 5, 6, 11 ]`.

## Answering Fast!

Now, if I ask: *"How many coins are in the first 3 banks?"*
You don't count. You just look at the 3rd number in your notebook: **6**. done!

What if I ask: *"How many coins are in banks 2, 3, and 4?"* (from the 2nd to the 4th)
You look at the total for the 4th bank (**11**).
But that includes the 1st bank, which we don't want!
So you subtract the total from *before* the 2nd bank (which is the 1st bank's total: **2**).

**11 - 2 = 9**.

That's it! By doing a little bit of work at the start (writing the notebook), you can answer any question instantly using just **one subtraction**.
