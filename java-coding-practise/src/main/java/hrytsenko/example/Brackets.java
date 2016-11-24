package hrytsenko.example;

import java.util.Stack;

/**
 * Utilities for analyzing text.
 */
public final class Brackets
{
    private Brackets()
    {
    }

    /**
     * Check that following brackets are paired: (), [], {}.
     *
     * @param text
     *         the input text.
     * @return <code>true</code> if the input text is valid and <code>false</code> otherwise.
     */
    public static boolean validate(String text)
    {
        char[] characters = text.toCharArray();

        if (text == null)
        {
            throw new NullPointerException();
        }
        if (text.isEmpty())
        {
            return true;
        }

        Stack openBrackets = new Stack<>();
        Stack closeBrackets = new Stack<>();
        boolean balanced = true;

        for (char character : characters)
        {
            if (isaBooleanOpenCharacter(character))
            {
                openBrackets.push(character);
            }
            if (isaBooleanClosedCharacter(character))
            {
                closeBrackets.push(character);
            }
        }

        if (openBrackets.size() != closeBrackets.size())
        {
            return false;
        }
        if (openBrackets.empty() && closeBrackets.empty())
        {
            return true;
        }
        for (char character : characters)
        {
            if (isaBooleanClosedCharacter(character))
            {
                //For the exact position
                if (openBrackets.peek() == character)
                {
                    openBrackets.pop();
                    balanced = true;

                }
                //on different position
                else if (openBrackets.peek() == '{' && character == '}' ||
                        openBrackets.peek() == '[' && character == ']' ||
                        openBrackets.peek() == '(' && character == ')')
                {
                    balanced = true;
                    openBrackets.pop();
                }
                else
                {
                    balanced = false;
                }
            }
        }
        return balanced;
    }

    private static boolean isaBooleanOpenCharacter(char character)
    {
        return character == '{' || character == '(' || character == '[';
    }

    private static boolean isaBooleanClosedCharacter(char character)
    {
        return character == ')' || character == '}' || character == ']';
    }
}
