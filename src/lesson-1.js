/*
 * Essentials of interpretation.
 * by Dmitry A. Soshnikov <dmitry.soshnikov@gmail.com>
 *
 * Lesson 1. The simplest arithmetic expressions (AE) evaluator.
 *
 * We use BNF (Backus-Naur Form) grammar to represent our language:
 *
 * <AE> ::= <num>
 *        | ["+" <AE> <AE>]
 *        | ["-" <AE> <AE>]
 *
 * <AE> non-terminal stands for Arithmetic Expression and is our Program.
 * ::= means "can be represented as"
 * | means OR
 * "+" and "-" are terminals.
 *
 * We use "parenthesized prefix" notation to represent
 * programs and expressions: [operator operand operand]
 *
 * To interpret this program we need a special procedure,
 * which is called "evaluator" ("eval" in short notation).
 *
 */

/**
 * evaluate
 * @param {Program} exp
 * Case analysis of the expression.
 *
 * "eval" accepts expression to evaluate
 * and depending on the expression's type
 * executes appropriate evaluating procedure
 */
function evaluate(exp) {

    // if it's a number, eval a number
    if (isNumber(exp))
        return evaluateNumber(exp);

    // if it's addition, eval the addition
    if (isAddition(exp))
        return evaluateAddition(exp);

    // if it's a subtraction, eval the subtraction
    if (isSubtraction(exp))
        return evaluateSubtraction(exp);

    if (isMultiplication(exp))
        return evaluateMultiplication(exp);

    if (isDivison(exp))
        return evaluateDivison(exp);



}

/**
 * isNumber
 * @param {Expression} exp
 * Tests whether an expression is a number
 */
function isDivison(exp) {
    return isTaggedList("\\", exp);
}

function isMultiplication(exp) {
    return isTaggedList("*", exp);
}

function isNumber(exp) {
    return !isNaN(+exp);
}

/**
 * isAddition
 * @param {Expression} exp
 * Tests whether an expression is a addition
 */
function isAddition(exp) {
    return isTaggedList("+", exp);
}

/**
 * isSubtraction
 * @param {Expression} exp
 * Tests whether an expression is a subtraction
 */
function isSubtraction(exp) {
    return isTaggedList("-", exp);
}


function isTaggedList(tag, exp) {
    return exp[0] == tag;
}


function evaluateNumber(exp) {
    return +exp;
}


function evaluateAddition(exp) {
    return evaluate(exp[1]) + evaluate(exp[2]);
}


function evaluateSubtraction(exp) {
    return evaluate(exp[1]) - evaluate(exp[2]);
}

function evaluateMultiplication(exp) {
    return evaluate(exp[1]) * evaluate(exp[2]);
}

function evaluateDivison(exp) {
    return evaluate(exp[1]) / evaluate(exp[2]);
}



// the simplest addition
var program = ["*", ["*", "2", "3"], "3"];
var result = evaluate(program);
console.log("result:", result);


// Exercises:
//
// 1. Implement multiplication and division
//
// 2. Encapsulate and improve handling of similar
//    expression types in "eval" reusing the code by getting
//    the type and running needed evaluator by dynamic name:
//    E.g.:
//      var expressionType = getType(exp);
//      return this["evaluate" + expressionType](exp);
//
// 3. Write a parser which translates concrete syntax to AST.
//    Chose any concrete syntax, e.g. infix math notation:
//    1 + 3 -> ["+", "1", "3"].
