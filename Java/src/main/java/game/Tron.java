package game;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;
import java.util.Timer;
import java.util.TimerTask;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

public class Tron extends JFrame implements KeyListener {

    int n = 150;

    KeyEvent e;
    BufferedImage c = new BufferedImage(n, n, BufferedImage.TYPE_3BYTE_BGR);

    JPanel gc = new JPanel() {
        public void paint(Graphics g) { g.drawImage(c, 0, 0, this); }
    };

    public void keyPressed(KeyEvent event) { e = event; }

    public void keyTyped(KeyEvent event) { }

    public void keyReleased(KeyEvent event) { }

    Graphics z;
    int[] g;
    int s;
    int x;
    Timer i;

    Tron() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        getContentPane().setLayout(new BorderLayout());
        getContentPane().add(gc, BorderLayout.CENTER);
        gc.setPreferredSize(new Dimension(n, n));
        getContentPane().add(new JLabel("play (press 'i', 'j', 'k' or 'l' to start)"), BorderLayout.SOUTH);
        pack();
        setVisible(true);

        z = c.getGraphics();
        g = new int[n * n]; // We are going to use g to store our grid to detect collisions.
        s = 0; // keeps track of the score and is set to 0.;
        x = 11325; // Tron's position, and is set to 11325 (11325=150*75+75=centre of the grid).

        addKeyListener(this);
    }
    
    void start() {
        z.fillRect(0, 0, n, n);

        i = new Timer();
        i.scheduleAtFixedRate(new TimerTask() { public void run() { interval(); } }, 0, 9);
    }

    void interval() {
        if (e != null) {
            // Updates x based on the value of e (remember, keyPressed saves the event in the e variable).
            x += new int[] { 1, -n, -1, n }[e.getKeyCode() & 3];
            if (0 < x % n && 
                x < n * n && 
                (g[x] ^= 1) == 1) {
                
                // draw a white pixel at the Tron's position
                z.clearRect(x % n, x / n, 1, 1);
                SwingUtilities.invokeLater(new Runnable() { public void run() { gc.repaint(); } });
                s++;

            } else {
                
                // We replace the game's content with "game over" and the score when a collision occurs.
                i.cancel();
                SwingUtilities.invokeLater(new Runnable() {
                    public void run() {
                        getContentPane().remove(gc);
                        getContentPane().add(new JLabel("game over: " + s), BorderLayout.CENTER);
                        revalidate();
                    }
                });
            }
        }
    }

    public static void main(String[] args) {
        new Tron().start();
    }
}
