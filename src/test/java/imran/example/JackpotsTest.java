package imran.example;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import imran.example.Game;
import imran.example.Jackpot;
import imran.example.Jackpots;

public class JackpotsTest {

    @Test
    public void assignJackpots_jackpotIsAbsent() {
        Game blackjack = new Game("BJ", "BJ_JP", null);

        Jackpots.assignJackpots(games(blackjack), jackpots());

        Assert.assertNull(blackjack.getJackpotAmount());
    }

    @Test
    public void assignJackpots_jackpotIsPresent() {
        Game blackjack = new Game("BJ", "BJ_JP", null);
        Jackpot blackjackJackpot = new Jackpot("BJ_JP", BigDecimal.ONE);

        Jackpots.assignJackpots(games(blackjack), jackpots(blackjackJackpot));

        Assert.assertEquals(BigDecimal.ONE, blackjack.getJackpotAmount());
    }

    @Test
    public void assignJackpots_jackpotIsUndefined() {
        Game blackjack = new Game("BJ", null, null);
        Jackpot blackjackJackpot = new Jackpot("BJ_JP", BigDecimal.ONE);

        Jackpots.assignJackpots(games(blackjack), jackpots(blackjackJackpot));

        Assert.assertNull(blackjack.getJackpotAmount());
    }

    @Test
    public void assignJackpots_jackpotIsDuplicated() {
        Game blackjack = new Game("BJ", "BJ_JP", null);
        Jackpot blackjackJackpot = new Jackpot("BJ_JP", BigDecimal.ONE);

        Jackpots.assignJackpots(games(blackjack), jackpots(blackjackJackpot, blackjackJackpot));

        Assert.assertEquals(BigDecimal.ONE, blackjack.getJackpotAmount());
    }

    @Test
    public void assignJackpots_gamesWithDifferentJackpots() {
        Game blackjack = new Game("BJ", "BJ_JP", null);
        Game roulette = new Game("RO", "RO_JP", null);
        Jackpot blackjackJackpot = new Jackpot("BJ_JP", BigDecimal.ONE);
        Jackpot rouletteJackpot = new Jackpot("RO_JP", BigDecimal.TEN);

        Jackpots.assignJackpots(games(blackjack, roulette), jackpots(blackjackJackpot, rouletteJackpot));

        Assert.assertEquals(BigDecimal.ONE, blackjack.getJackpotAmount());
        Assert.assertEquals(BigDecimal.TEN, roulette.getJackpotAmount());
    }

    @Test
    public void assignJackpots_gamesWithSameJackpot() {
        Game blackjack = new Game("BJ", "JP", null);
        Game roulette = new Game("RO", "JP", null);
        Jackpot jackpot = new Jackpot("JP", BigDecimal.ONE);

        Jackpots.assignJackpots(games(blackjack, roulette), jackpots(jackpot));

        Assert.assertEquals(BigDecimal.ONE, blackjack.getJackpotAmount());
        Assert.assertEquals(BigDecimal.ONE, roulette.getJackpotAmount());
    }

    private static List<Game> games(Game... games) {
        return Arrays.asList(games);
    }

    private static List<Jackpot> jackpots(Jackpot... jackpots) {
        return Arrays.asList(jackpots);
    }

}
