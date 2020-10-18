package game;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

import java.awt.Component;
import java.awt.event.KeyEvent;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;

import javax.swing.SwingUtilities;

import org.approvaltests.Approvals;
import org.approvaltests.reporters.ImageWebReporter;
import org.approvaltests.reporters.UseReporter;
import org.junit.After;
import org.junit.Ignore;
import org.junit.Test;

@UseReporter(ImageWebReporter.class)
public class TronTest {

    Tron tron = new Tron();

    @Test
    @Ignore("included in next test")
    public void shouldDrawTheFillRectOnStart() throws InvocationTargetException, InterruptedException {
        tron.start();

        verifyCanvas();
    }

    @Test
    public void shouldDoNothingUntilKeyIsPressed() throws InvocationTargetException, InterruptedException {
        tron.start();

        runTicks(3);

        assertScoreEqual(0);
        assertTrue(canvasIsVisible());
        verifyCanvas(); // see the empty canvas
    }

    private void runTicks(int count) {
        for (int i = 0; i < count; i++) {
            tron.interval();
        }
    }

    private boolean canvasIsVisible() throws InvocationTargetException, InterruptedException {
        waitForEventQueue();
        List<Component> components = Arrays.asList(tron.getContentPane().getComponents());
        return components.contains(tron.gc);
    }

    @Test
    public void shouldGoUpWhenPlaying() throws InvocationTargetException, InterruptedException {
        tron.start();
        tron.i.cancel();

        pressKey('i'); // i = up
        runTicks(3);

        assertScoreEqual(3);
        verifyCanvas(); // see three dots on the canvas
    }

    private void pressKey(char key) {
        tron.keyPressed(new KeyEvent(tron.gc, 1, 1, 0, key, key));
    }

    @Test
    public void shouldGoLeftWhenPlaying() throws InvocationTargetException, InterruptedException {
        tron.start();
        tron.i.cancel();

        pressKey('j'); // j = left      
        runTicks(3);

        assertScoreEqual(3);
        verifyCanvas();
    }

    @Test
    public void shouldGoDownWhenPlaying() throws InvocationTargetException, InterruptedException {
        tron.start();
        tron.i.cancel();

        pressKey('k'); // k = down      
        runTicks(3);

        assertScoreEqual(3);
        verifyCanvas();
    }

    @Test
    public void shouldGoRightWhenPlaying() throws InvocationTargetException, InterruptedException {
        tron.start();
        tron.i.cancel();

        pressKey('l'); // l = right      
        runTicks(3);

        assertScoreEqual(3);
        verifyCanvas();
    }

    @Test
    public void shouldDieOnHittingUpperWall() throws InvocationTargetException, InterruptedException {
        tron.start();

        pressKey('i');
        Thread.sleep(9 * 99);

        assertGameIsOver();
        assertScoreEqual(75);
        verifyFrame(); // see "game over" at frame
    }

    @Test
    public void shouldDieOnHittingItself() throws InterruptedException, InvocationTargetException {
        tron.start();
        tron.i.cancel();
        pressKey('i');
        tron.interval();
        pressKey('j');
        tron.interval();
        pressKey('k');
        tron.interval();
        pressKey('l');
        tron.interval();

        pressKey('i');
        tron.interval();

        assertGameIsOver();
        assertScoreEqual(4);
    }

    @Test
    public void shouldDieOnHittingLeftWall() throws InterruptedException, InvocationTargetException {
        tron.start();

        pressKey('j');
        Thread.sleep(9 * 75);

        assertGameIsOver();
        assertScoreEqual(74);
    }

    @Test
    public void shouldDieOnHittingLeftWallFast() throws InterruptedException, InvocationTargetException {
        tron.start();
        tron.i.cancel();

        pressKey('j');
        runTicks(75);

        assertGameIsOver();
        assertScoreEqual(74);
    }

    @Test
    public void shouldDieOnHittingLowerWallFast() throws InterruptedException, InvocationTargetException {
        tron.start();
        tron.i.cancel();

        pressKey('k');
        runTicks(75);

        assertGameIsOver();
        assertScoreEqual(74);
    }

    @Test
    public void shouldDieOnHittingRightWall() throws InterruptedException, InvocationTargetException {
        tron.start();
        tron.i.cancel();

        pressKey('l');
        runTicks(75);

        assertGameIsOver();
        assertScoreEqual(74);
    }

    private void assertGameIsOver() throws InvocationTargetException, InterruptedException {
        assertFalse(canvasIsVisible());
    }

    private void assertScoreEqual(int score) {
        assertEquals(score, tron.s);
    }

    private void verifyCanvas() throws InterruptedException, InvocationTargetException {
        waitForEventQueue();
        Approvals.verify(tron.gc);
    }

    private void verifyFrame() throws InterruptedException, InvocationTargetException {
        waitForEventQueue();
        Approvals.verify(tron);
    }

    private void waitForEventQueue() throws InterruptedException, InvocationTargetException {
        SwingUtilities.invokeAndWait(new Runnable() {
            @Override
            public void run() {
                // wait for Event Queue done
            }
        });
    }

    @After
    public void closeFrame() {
        tron.i.cancel();
        tron.setVisible(false);
        tron.dispose();
    }

}
