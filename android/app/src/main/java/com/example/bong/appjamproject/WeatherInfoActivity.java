package com.example.bong.appjamproject;

import android.app.Activity;
import android.graphics.Typeface;
import android.os.Bundle;
import android.widget.TextView;

/**
 * Created by Bong on 2017-04-01.
 */

public class WeatherInfoActivity extends Activity {
    private Typeface typeFace = null;
    private TextView tv1, tv2, tv3, tv4, cityName, cityTemp, cityDif, cityWater, cityDust;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather_info);
        typeFace = Typeface.createFromAsset(getAssets(), "sangm.ttf");
        tv1 = (TextView)findViewById(R.id.tv1);
        tv2 = (TextView)findViewById(R.id.tv2);
        tv3 = (TextView)findViewById(R.id.tv3);
        tv4 = (TextView)findViewById(R.id.tv4);
        cityName = (TextView)findViewById(R.id.city_name);
        cityTemp = (TextView)findViewById(R.id.city_temp);
        cityDif = (TextView)findViewById(R.id.city_dif);
        cityWater = (TextView)findViewById(R.id.city_water);
        cityDust = (TextView)findViewById(R.id.city_dust);

        tv1.setTypeface(typeFace);
        tv2.setTypeface(typeFace);
        tv3.setTypeface(typeFace);
        tv4.setTypeface(typeFace);
        cityName.setTypeface(typeFace);
        cityTemp.setTypeface(typeFace);
        cityDif.setTypeface(typeFace);
        cityWater.setTypeface(typeFace);
        cityDust.setTypeface(typeFace);

    }
}
