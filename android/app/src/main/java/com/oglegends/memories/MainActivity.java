package com.oglegends.memories;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class MainActivity extends BridgeActivity {
    private static final String CHANNEL_ID = "og_legends_live";
    private static final String EXTRA_TARGET_PAGE = "og_target_page";
    private static final int REQ_APP_PERMISSIONS = 2026;
    private final AtomicInteger notifyCounter = new AtomicInteger(100);
    private int pendingTargetPage = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        final int bgColor = Color.parseColor("#090a0f");
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
        getWindow().setStatusBarColor(bgColor);
        getWindow().setNavigationBarColor(bgColor);

        WindowInsetsControllerCompat insetsController =
                WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        if (insetsController != null) {
            insetsController.setAppearanceLightStatusBars(false);
            insetsController.setAppearanceLightNavigationBars(false);
        }

        View rootContent = findViewById(android.R.id.content);
        if (rootContent != null) {
            rootContent.setBackgroundColor(bgColor);
            ViewCompat.setOnApplyWindowInsetsListener(rootContent, (view, windowInsets) -> {
                Insets bars = windowInsets.getInsets(
                        WindowInsetsCompat.Type.systemBars()
                                | WindowInsetsCompat.Type.displayCutout()
                                | WindowInsetsCompat.Type.ime()
                );
                view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
                return WindowInsetsCompat.CONSUMED;
            });
            ViewCompat.requestApplyInsets(rootContent);
        }

        createNotificationChannel();
        captureTargetPageFromIntent(getIntent());

        WebView webView = getBridge() != null ? getBridge().getWebView() : null;
        if (webView != null) {
            webView.addJavascriptInterface(new OGNativeBridge(), "OGNativeBridge");
            if (pendingTargetPage >= 0) {
                final int target = pendingTargetPage;
                pendingTargetPage = -1;
                webView.postDelayed(() -> routeWebViewToPage(target), 750);
            }
        }

        // Request notification and media permissions upfront on launch
        if (rootContent != null) {
            rootContent.postDelayed(this::requestStartupPermissions, 450);
        } else {
            requestStartupPermissions();
        }

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                WebView wv = getBridge() != null ? getBridge().getWebView() : null;
                if (wv == null) {
                    moveTaskToBack(true);
                    return;
                }
                wv.evaluateJavascript(
                        "(function(){try{return window.__ogHandleAndroidBack ? String(window.__ogHandleAndroidBack()) : 'false';}catch(e){return 'false';}})()",
                        result -> {
                            if (!"\"true\"".equals(result) && !"true".equals(result)) {
                                moveTaskToBack(true);
                            }
                        }
                );
            }
        });
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        captureTargetPageFromIntent(intent);
        if (pendingTargetPage >= 0) {
            final int target = pendingTargetPage;
            pendingTargetPage = -1;
            routeWebViewToPage(target);
        }
    }

    private void captureTargetPageFromIntent(Intent intent) {
        if (intent != null && intent.hasExtra(EXTRA_TARGET_PAGE)) {
            pendingTargetPage = intent.getIntExtra(EXTRA_TARGET_PAGE, -1);
            intent.removeExtra(EXTRA_TARGET_PAGE);
        }
    }

    private void routeWebViewToPage(int targetPage) {
        WebView wv = getBridge() != null ? getBridge().getWebView() : null;
        if (wv == null || targetPage < 0) return;
        wv.post(() -> wv.evaluateJavascript(
                "window.__ogOpenNotificationTarget && window.__ogOpenNotificationTarget(" + targetPage + ");",
                null
        ));
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "The OG Legends Live Updates",
                    NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription("Live alerts for Batch Group messages, new photos, videos, journeys, and profiles");
            channel.enableVibration(true);
            channel.enableLights(true);
            channel.setLightColor(Color.parseColor("#f3c15a"));
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private void requestStartupPermissions() {
        List<String> needed = new ArrayList<>();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                    != PackageManager.PERMISSION_GRANTED) {
                needed.add(Manifest.permission.POST_NOTIFICATIONS);
            }
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES)
                    != PackageManager.PERMISSION_GRANTED) {
                needed.add(Manifest.permission.READ_MEDIA_IMAGES);
            }
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_VIDEO)
                    != PackageManager.PERMISSION_GRANTED) {
                needed.add(Manifest.permission.READ_MEDIA_VIDEO);
            }
        } else {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED) {
                needed.add(Manifest.permission.READ_EXTERNAL_STORAGE);
            }
            if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.Q
                    && ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED) {
                needed.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
            }
        }
        if (!needed.isEmpty()) {
            ActivityCompat.requestPermissions(this, needed.toArray(new String[0]), REQ_APP_PERMISSIONS);
        }
    }

    private boolean hasNotifPerm() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            return ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                    == PackageManager.PERMISSION_GRANTED;
        }
        return NotificationManagerCompat.from(this).areNotificationsEnabled();
    }

    private boolean hasMediaPerm() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            return ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES)
                    == PackageManager.PERMISSION_GRANTED
                    && ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_VIDEO)
                    == PackageManager.PERMISSION_GRANTED;
        }
        return ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE)
                == PackageManager.PERMISSION_GRANTED;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQ_APP_PERMISSIONS) {
            WebView wv = getBridge() != null ? getBridge().getWebView() : null;
            if (wv != null) {
                wv.post(() -> wv.evaluateJavascript(
                        "window.dispatchEvent(new CustomEvent('ogpermissions:updated'));",
                        null
                ));
            }
        }
    }

    private void showNativeNotification(String title, String body, int targetPage, String tag) {
        if (!hasNotifPerm()) return;
        try {
            Intent intent = new Intent(this, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.putExtra(EXTRA_TARGET_PAGE, targetPage);

            int reqCode = (tag != null ? (tag.hashCode() & 0x7fffffff) : notifyCounter.incrementAndGet());
            PendingIntent pendingIntent = PendingIntent.getActivity(
                    this,
                    reqCode,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            Bitmap largeIcon = BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher);
            NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setSmallIcon(R.drawable.ic_stat_og)
                    .setLargeIcon(largeIcon)
                    .setColor(Color.parseColor("#f3c15a"))
                    .setContentTitle(title != null && !title.isEmpty() ? title : "The OG Legends")
                    .setContentText(body != null ? body : "")
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(body != null ? body : ""))
                    .setPriority(NotificationCompat.PRIORITY_HIGH)
                    .setDefaults(NotificationCompat.DEFAULT_ALL)
                    .setAutoCancel(true)
                    .setContentIntent(pendingIntent);

            int notifId = notifyCounter.incrementAndGet();
            NotificationManagerCompat.from(this).notify(notifId, builder.build());
        } catch (SecurityException ignored) {
        } catch (Exception ignored) {
        }
    }

    public class OGNativeBridge {
        @JavascriptInterface
        public boolean isNativeApp() {
            return true;
        }

        @JavascriptInterface
        public boolean hasNotificationPermission() {
            return hasNotifPerm();
        }

        @JavascriptInterface
        public boolean hasMediaPermission() {
            return hasMediaPerm();
        }

        @JavascriptInterface
        public void requestAllPermissions() {
            runOnUiThread(MainActivity.this::requestStartupPermissions);
        }

        @JavascriptInterface
        public void notify(String title, String body, int targetPage, String tag) {
            showNativeNotification(title, body, targetPage, tag);
        }
    }
}
