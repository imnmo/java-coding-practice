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
        char[] myArray = text.toCharArray();
        Stack myStackInward = new Stack<>();
        Stack myStackOutward = new Stack<>();
        boolean isBalanced = true;

        if (text == null)
        {
            throw new NullPointerException();
        }
        if (text.isEmpty())
        {
            return true;
        }

        //push items to two stack
        for (int i = 0; i <= myArray.length - 1; i++)
        {
            //add all symbols
            if (myArray[i] == '{' || myArray[i] == '(' || myArray[i] == '[')
            {
                myStackInward.push(myArray[i]);
            }
            if (myArray[i] == ')' || myArray[i] == '}' || myArray[i] == ']')
            {
                myStackOutward.push(myArray[i]);
            }
        }

        if (myStackInward.size() != myStackOutward.size())
        {
            return false;
        }
        //Do comparison on peeked elements
        for (int i = myArray.length - 1; i != 0; i--)
        {
            if (myArray[i] == ')' || myArray[i] == '}' || myArray[i] == ']')
            {
                if (myStackInward.peek() == '{' && myArray[i] == '}' ||
                        myStackInward.peek() == '[' && myArray[i] == ']' ||
                        myStackInward.peek() == '(' && myArray[i] == ')')
                {
                    isBalanced = true;
                    myStackInward.pop();
                }
                else
                {
                    isBalanced = false;
                }
            }
        }
        return isBalanced;
    }

}
