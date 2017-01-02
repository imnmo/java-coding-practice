package imran.example;

import java.math.BigDecimal;

public class Game {

    private String id;
    private String jackpotId;
    private BigDecimal jackpotAmount;

    public Game(String id, String jackpotId, BigDecimal jackpotAmount) {
        this.id = id;
        this.jackpotId = jackpotId;
        this.jackpotAmount = jackpotAmount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJackpotId() {
        return jackpotId;
    }

    public void setJackpotId(String jackpotId) {
        this.jackpotId = jackpotId;
    }

    public BigDecimal getJackpotAmount() {
        return jackpotAmount;
    }

    public void setJackpotAmount(BigDecimal jackpotAmount) {
        this.jackpotAmount = jackpotAmount;
    }

}
