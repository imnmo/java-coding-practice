package hrytsenko.example;

import org.junit.Assert;
import org.junit.Test;

public class BracketsTest
{

    @Test(expected = NullPointerException.class)
    public void validate_nullString_throwException()
    {
        Brackets.validate(null);
    }

    @Test
    public void validate_emptyString_valid()
    {
        boolean valid = Brackets.validate("");
        Assert.assertTrue(valid);
    }

    @Test
    public void validate_noBrackets_valid()
    {
        boolean valid = Brackets.validate("foo");
        Assert.assertTrue(valid);
    }

    @Test
    public void validate_roundBrackets_valid()
    {
        boolean valid = Brackets.validate("(foo)");
        Assert.assertTrue(valid);
    }

    @Test
    public void validate_squareBrackets_valid()
    {
        boolean valid = Brackets.validate("[foo]");
        Assert.assertTrue(valid);
    }

    @Test
    public void validate_curlyBrackets_valid()
    {
        boolean valid = Brackets.validate("{foo}");
        Assert.assertTrue(valid);
    }

    @Test
    public void validate_nestedBrackets_valid()
    {
        boolean valid = Brackets.validate("(foo(bar))");
        Assert.assertTrue(valid);
    }

    @Test
    public void validate_severalBrackets_valid()
    {
        boolean valid = Brackets.validate("(foo){bar}");
        Assert.assertTrue(valid);
    }

    @Test
    public void validate_noClosingBracket_invalid()
    {
        boolean valid = Brackets.validate("(foo");
        Assert.assertFalse(valid);
    }

    @Test
    public void validate_noOpeningBracket_invalid()
    {
        boolean valid = Brackets.validate("foo)");
        Assert.assertFalse(valid);
    }

    @Test
    public void validate_bracketsNotMatch_invalid()
    {
        boolean valid = Brackets.validate("(foo]");
        Assert.assertFalse(valid);
    }

    @Test
    public void validateHackerRankCases()
    {

        boolean valid = Brackets.validate("3");
        Assert.assertTrue(valid);
        boolean valid2 = Brackets.validate("{[()]}");
        Assert.assertTrue(valid2);
        boolean valid3 = Brackets.validate("{[(])}");
        Assert.assertFalse(valid3);
        boolean valid4 = Brackets.validate("{{[[(())]]}}");
        Assert.assertTrue(valid4);
    }

}
