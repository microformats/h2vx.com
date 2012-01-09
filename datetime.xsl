<xsl:transform
    xmlns:xsl      ="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:datetime ="http://suda.co.uk/projects/microformats/datetime.xsl?template="
    xmlns:html     ="http://www.w3.org/1999/xhtml"
    exclude-result-prefixes="datetime html"
	>
	
	<!--
		Copyright 2006 Brian Suda
		This work is licensed under The W3C Open Source License
		http://www.w3.org/Consortium/Legal/copyright-software-19980720	
		
		VERSION: 0.2
		2010-03-06
	-->
	
	<xsl:variable name="ucase" select='"ABCDEFGHIJKLMNOPQRSTUVWXYZ"'/>
	<xsl:variable name="lcase" select='"abcdefghijklmnopqrstuvwxyz"'/>
	
	<xsl:template name="datetime:clock12-to-24">    
        <xsl:param name="time-string"/>
        <xsl:choose>
            <xsl:when test="substring-before(translate($time-string,$ucase,$lcase),'a') = true()">
            <!--
                <xsl:text>{</xsl:text>
                <xsl:value-of select="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'a')))" />
                <xsl:text>}</xsl:text>
            -->
		        <xsl:choose>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'a'))) = 1">
		                <xsl:text>0</xsl:text>		                
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'a')"/>
		                <xsl:text>0000</xsl:text>
		            </xsl:when>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'a'))) = 2">
		                <xsl:choose>
		                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'a')),1,2) = 12">
        		                <xsl:text>000000</xsl:text>
		                    </xsl:when>
		                    <xsl:otherwise>
        		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'a')"/>
        		                <xsl:text>0000</xsl:text>		                        
		                    </xsl:otherwise>
		                </xsl:choose>
		            </xsl:when>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'a'))) = 3">
		                <xsl:text>0</xsl:text>		                
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'a')"/>
		                <xsl:text>00</xsl:text>
		            </xsl:when>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'a'))) = 4">
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'a')"/>
		                <xsl:text>00</xsl:text>
		            </xsl:when>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'a'))) = 5">
		                <xsl:text>0</xsl:text>		                
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'a')"/>
		            </xsl:when>
		            <xsl:otherwise>
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'a')"/>
		            </xsl:otherwise>
		        
		        
		        </xsl:choose>
            </xsl:when>
            <xsl:when test="substring-before(translate($time-string,$ucase,$lcase),'p') = true()">
                <!-- need to somehow add 12 hours! -->
            
                <xsl:choose>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 12"><xsl:text>12</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 10"><xsl:text>22</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 11"><xsl:text>23</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 01"><xsl:text>13</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 02"><xsl:text>14</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 03"><xsl:text>15</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 04"><xsl:text>16</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 05"><xsl:text>17</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 06"><xsl:text>18</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 07"><xsl:text>19</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 08"><xsl:text>20</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,2) = 09"><xsl:text>21</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,1) = 1"><xsl:text>13</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,1) = 2"><xsl:text>14</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,1) = 3"><xsl:text>15</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,1) = 4"><xsl:text>16</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,1) = 5"><xsl:text>17</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,1) = 6"><xsl:text>18</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,1) = 7"><xsl:text>19</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,1) = 8"><xsl:text>20</xsl:text></xsl:when>
                    <xsl:when test="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),1,1) = 9"><xsl:text>21</xsl:text></xsl:when>
                </xsl:choose>
                
                <xsl:choose>
                    <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'p'))) = 1 or 
                                    string-length(normalize-space(substring-before(translate($time-string,':',''),'p'))) = 2">
                        <xsl:text>0000</xsl:text>
                    </xsl:when>
                    <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'p'))) = 3">
                        <xsl:value-of select="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),2)" />
                        <xsl:text>00</xsl:text>
                    </xsl:when>
                    <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'p'))) = 4">
                        <xsl:value-of select="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),3)" />
                        <xsl:text>00</xsl:text>
                    </xsl:when>
                    <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'p'))) = 5">
                        <xsl:value-of select="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),2)" />
                    </xsl:when>
                    <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'p'))) = 6">
                        <xsl:value-of select="substring(normalize-space(substring-before(translate($time-string,':',''),'p')),3)" />
                    </xsl:when>
                    
                </xsl:choose>
                
                <!--
                <xsl:choose>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'p'))) = 1">
		                <xsl:text>0</xsl:text>		                
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'p')"/>
		                <xsl:text>0000</xsl:text>
		            </xsl:when>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'p'))) = 2">
        		            <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'p')"/>
        		            <xsl:text>0000</xsl:text>		                        
		            </xsl:when>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'p'))) = 3">
		                <xsl:text>0</xsl:text>		                
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'a')"/>
		                <xsl:text>00</xsl:text>
		            </xsl:when>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'p'))) = 4">
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'a')"/>
		                <xsl:text>00</xsl:text>
		            </xsl:when>
		            <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,$ucase,$lcase),'p'))) = 5">
		                <xsl:text>0</xsl:text>		                
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'p')"/>
		            </xsl:when>
		            <xsl:otherwise>
		                <xsl:value-of select="substring-before(translate($time-string,$ucase,$lcase),'p')"/>
		            </xsl:otherwise>
		        
		        </xsl:choose>
	            -->

            <!--
            -->
            </xsl:when>

            <xsl:when test="
                string-length(translate(substring-after($time-string,'T'),':','')) &lt; 7
                or
                string-length(translate(substring-before($time-string,'+'),':','')) &lt; 7
                or
                string-length(translate(substring-before($time-string,'-'),':','')) &lt; 7
                ">
                <!--
                <xsl:text>#</xsl:text>
                <xsl:value-of select="$time-string"/>
                <xsl:text>#</xsl:text>
            -->
                <xsl:choose>
                    <xsl:when test="(string-length(normalize-space(translate($time-string,'T','')))+1) = string-length(normalize-space($time-string)) and
                        (string-length(normalize-space(translate($time-string,'-','')))) = string-length(normalize-space($time-string)) and
                        (string-length(normalize-space(translate($time-string,'+','')))) = string-length(normalize-space($time-string))
                        ">
                        <xsl:value-of select="normalize-space($time-string)" />
                        <xsl:if test="(string-length(normalize-space(translate($time-string,'Z','')))+1) != string-length(normalize-space($time-string))">
                            <xsl:text>Z</xsl:text>
                        </xsl:if>
                    </xsl:when>
                    
                    
                    <xsl:when test="(string-length(normalize-space(translate($time-string,'-','')))+1) = string-length(normalize-space($time-string)) ">
                        <xsl:value-of select="substring-before($time-string,'T')" />
                            <xsl:if test="string-length(normalize-space(substring-before(translate($time-string,':',''),'-'))) &gt; 0">
                                <xsl:text>T</xsl:text>                            
                            </xsl:if>

                            <xsl:choose>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'-'))) = 1">
                                    <xsl:text>0</xsl:text>
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'-'))"/>
                                    <xsl:text>0000</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'-'))) = 2">
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'-'))"/>
                                    <xsl:text>0000</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'-'))) = 3">
                                    <xsl:text>0</xsl:text>
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'-'))"/>
                                    <xsl:text>00</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'-'))) = 4">
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'-'))"/>
                                    <xsl:text>00</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'-'))) = 5">
                                    <xsl:text>0</xsl:text>
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'-'))"/>
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'-'))) = 6">
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'-'))"/>
                                </xsl:when>
                            </xsl:choose>
                            <xsl:text>-</xsl:text>
                        <xsl:choose>
                            <xsl:when test="string-length(normalize-space(substring-after(translate($time-string,':',''),'-'))) = 1">
                                <xsl:text>0</xsl:text>
                                <xsl:value-of select="normalize-space(substring-after(translate($time-string,':',''),'-'))"/>
                                <xsl:text>00</xsl:text>                                
                            </xsl:when>
                            <xsl:when test="string-length(normalize-space(substring-after(translate($time-string,':',''),'-'))) = 2">
                                <xsl:value-of select="normalize-space(substring-after(translate($time-string,':',''),'-'))"/>
                                <xsl:text>00</xsl:text>                                
                            </xsl:when>
                            <xsl:when test="string-length(normalize-space(substring-after(translate($time-string,':',''),'-'))) = 3">
                                <xsl:text>0</xsl:text>
                                <xsl:value-of select="normalize-space(substring-after(translate($time-string,':',''),'-'))"/>
                            </xsl:when>
                            <xsl:when test="string-length(normalize-space(substring-after(translate($time-string,':',''),'-'))) = 4">
                                <xsl:value-of select="normalize-space(substring-after(translate($time-string,':',''),'-'))"/>
                            </xsl:when>
                        </xsl:choose>
                    </xsl:when>
                    
                    <xsl:when test="(string-length(normalize-space(translate($time-string,'+','')))+1) = string-length(normalize-space($time-string)) ">
                        <xsl:value-of select="substring-before($time-string,'T')" />

                        <!-- bit before the TZ -->
                        <xsl:if test="string-length(normalize-space(substring-before(translate($time-string,':',''),'+'))) &gt; 0">
                            <xsl:text>T</xsl:text>
                        </xsl:if>
                            <xsl:choose>
                                <!-- for just times -->
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'+'))) = 1">
                                    <xsl:text>0</xsl:text>
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'+'))"/>
                                    <xsl:text>0000</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'+'))) = 2">
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'+'))"/>
                                    <xsl:text>0000</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'+'))) = 3">
                                    <xsl:text>0</xsl:text>
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'+'))"/>
                                    <xsl:text>00</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'+'))) = 4">
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'+'))"/>
                                    <xsl:text>00</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'+'))) = 5">
                                    <xsl:text>0</xsl:text>
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'+'))"/>
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate($time-string,':',''),'+'))) = 6">
                                    <xsl:value-of select="normalize-space(substring-before(translate($time-string,':',''),'+'))"/>
                                </xsl:when>
                                
                                <!-- for full date-times -->
                                <xsl:when test="string-length(normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))) = 1">
                                    <xsl:text>0</xsl:text>
                                    <xsl:value-of select="normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))"/>
                                    <xsl:text>0000</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))) = 2">
                                    <xsl:value-of select="normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))"/>
                                    <xsl:text>0000</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))) = 3">
                                    <xsl:text>0</xsl:text>
                                    <xsl:value-of select="normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))"/>
                                    <xsl:text>00</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))) = 4">
                                    <xsl:value-of select="normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))"/>
                                    <xsl:text>00</xsl:text>                                
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))) = 5">
                                    <xsl:text>0</xsl:text>
                                    <xsl:value-of select="normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))"/>
                                </xsl:when>
                                <xsl:when test="string-length(normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))) = 6">
                                    <xsl:value-of select="normalize-space(substring-before(translate(substring-after($time-string,'T'),':',''),'+'))"/>
                                </xsl:when>
                            </xsl:choose>
                            <xsl:text>+</xsl:text>
                        <!-- after the TZ -->
                        <xsl:choose>
                            <xsl:when test="string-length(normalize-space(substring-after(translate($time-string,':',''),'+'))) = 1">
                                <xsl:text>0</xsl:text>
                                <xsl:value-of select="normalize-space(substring-after(translate($time-string,':',''),'+'))"/>
                                <xsl:text>00</xsl:text>                                
                            </xsl:when>
                            <xsl:when test="string-length(normalize-space(substring-after(translate($time-string,':',''),'+'))) = 2">
                                <xsl:value-of select="normalize-space(substring-after(translate($time-string,':',''),'+'))"/>
                                <xsl:text>00</xsl:text>                                
                            </xsl:when>
                            <xsl:when test="string-length(normalize-space(substring-after(translate($time-string,':',''),'+'))) = 3">
                                <xsl:text>0</xsl:text>
                                <xsl:value-of select="normalize-space(substring-after(translate($time-string,':',''),'+'))"/>
                            </xsl:when>
                            <xsl:when test="string-length(normalize-space(substring-after(translate($time-string,':',''),'+'))) = 4">
                                <xsl:value-of select="normalize-space(substring-after(translate($time-string,':',''),'+'))"/>
                            </xsl:when>
                        </xsl:choose>

                    </xsl:when>
                    
                    <xsl:otherwise>                        
                        <xsl:choose>
                            <!-- probably a time -->
                            <xsl:when test="string-length(normalize-space($time-string)) = 4">
                                <!-- <xsl:text>T</xsl:text> -->
                                <xsl:value-of select="normalize-space($time-string)" /><xsl:text>00</xsl:text>
                            </xsl:when>
                            <xsl:when test="(string-length(normalize-space(translate($time-string,'Z','')))+1) = string-length(normalize-space($time-string)) ">
                                <xsl:value-of select="normalize-space(translate($time-string,'Z',''))" />
                                <xsl:if test="string-length(normalize-space(translate($time-string,'Z',''))) = 4">
                                    <xsl:text>00</xsl:text>
                                </xsl:if>
                                <xsl:text>Z</xsl:text>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="normalize-space($time-string)" />
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>

            <xsl:otherwise>
                <xsl:value-of select="$time-string" />
            </xsl:otherwise>
        </xsl:choose>
</xsl:template>
<xsl:template name="datetime:zclock12-to-24">
        <xsl:choose>
            <xsl:when test="
                string-length(translate(substring-after($time-string,'T'),':','')) &lt; 7
                or
                string-length(translate(substring-before($time-string,'+'),':','')) &lt; 7
                or
                string-length(translate(substring-before($time-string,'-'),':','')) &lt; 7

                ">
            </xsl:when>
        </xsl:choose>

</xsl:template>
	
	<!-- convert all times to UTC Times -->
	<!-- RFC2426 mandates that iCal dates are in UTC without dashes or colons as separators -->
	<xsl:template name="datetime:utc-time-converter-worker">
    	<xsl:param name="date-exclusive"/>
	    <xsl:param name="base-date"/>
	    <xsl:param name="base-tzid"/>
	    <xsl:param name="time-string"/>
	    <!-- need to get this into a variable -->
	    <xsl:variable name="date-time">
		    <xsl:call-template name="datetime:utc-time-converter">
		        <xsl:with-param name="date-exclusive"><xsl:value-of select="$date-exclusive" /></xsl:with-param>
		        <xsl:with-param name="base-date"><xsl:value-of select="$base-date" /></xsl:with-param>
		        <xsl:with-param name="base-tzid"><xsl:value-of select="$base-tzid" /></xsl:with-param>
			    <xsl:with-param name="time-string"><xsl:value-of select="$time-string"/></xsl:with-param>
		    </xsl:call-template>
	    </xsl:variable>
	    
	    <xsl:value-of select="$date-time" />
    </xsl:template>

	<xsl:template name="datetime:utc-time-converter">
    	<xsl:param name="date-exclusive"/>
	    <xsl:param name="base-date"/>
	    <xsl:param name="base-tzid"/>
	    <xsl:param name="time-string"/>

       <!-- <xsl:text>|</xsl:text><xsl:value-of select="$time-string"/><xsl:text>|</xsl:text> -->

<xsl:variable name="cleaned-date-time">
	<xsl:choose>
	    <!-- getting only a time and possibly TZ or Z? -->
        <!--
	    <xsl:when test="string-length(translate(translate(substring-before($time-string,'Z'), ':' ,''), '-' ,''))  &lt; 7">
            <xsl:text>...</xsl:text>
	        <xsl:call-template name="datetime:utc-time-converter">
                <xsl:with-param name="time-string"><xsl:value-of select="$base-date" /><xsl:text>T</xsl:text><xsl:value-of select="$time-string" /></xsl:with-param>
			</xsl:call-template>
	    </xsl:when>
	    -->
	    
	    <!-- issue with infinite recursion somewhere in here? -->
        <xsl:when test="substring-before($time-string,'T') = false()">
		    <xsl:choose>
		        <xsl:when test="(string-length(normalize-space(translate($time-string,'-','')))+1) = string-length(normalize-space($time-string))">
                    <xsl:call-template name="datetime:utc-time-converter">
	                    <xsl:with-param name="time-string"><xsl:value-of select="$base-date" /><xsl:text>T</xsl:text><xsl:value-of select="$time-string" /></xsl:with-param>
					</xsl:call-template>
		        </xsl:when>
		        <xsl:when test="(string-length(normalize-space(translate($time-string,'+','')))+1) = string-length(normalize-space($time-string))">
                    <xsl:call-template name="datetime:utc-time-converter">
	                    <xsl:with-param name="time-string"><xsl:value-of select="$base-date" /><xsl:text>T</xsl:text><xsl:value-of select="$time-string" /></xsl:with-param>
					</xsl:call-template>
		        </xsl:when>
		        
		        <xsl:when test="substring-before($time-string,'Z') = true() and string-length(normalize-space($time-string)) &lt; 8">
                    <xsl:call-template name="datetime:utc-time-converter">
	                    <xsl:with-param name="time-string"><xsl:value-of select="$base-date" /><xsl:text>T</xsl:text><xsl:value-of select="$time-string" /></xsl:with-param>
					</xsl:call-template>
		        </xsl:when>
		        
		        <xsl:when test="substring-before($time-string,'Z') = true()">
                    <xsl:call-template name="datetime:utc-time-converter">
	                    <xsl:with-param name="time-string">
	                        <xsl:value-of select="substring(translate($time-string,'-',''),1,8)"/>
	                        <xsl:text>T</xsl:text>
	                        <xsl:value-of select="substring(translate(translate($time-string,'-',''),':',''),9)"/>
	                        </xsl:with-param>
					</xsl:call-template>

		        </xsl:when>
		        
        		<xsl:when test="string-length(translate(translate(normalize-space($time-string), ':' ,''), '-' ,'')) = 12">
        			<xsl:value-of select="substring(translate(translate(normalize-space($time-string), ':' ,''), '-' ,''),1,8)"/>
        			<xsl:text>T</xsl:text>
        			<xsl:value-of select="substring(translate(translate(normalize-space($time-string), ':' ,''), '-' ,''),9,4)"/>						
        			<xsl:text>00</xsl:text>
        		</xsl:when>
        		<xsl:when test="string-length(translate(translate(normalize-space($time-string), ':' ,''), '-' ,'')) = 14">
        			<xsl:value-of select="substring(translate(translate(normalize-space($time-string), ':' ,''), '-' ,''),1,8)"/>
        			<xsl:text>T</xsl:text>
        			<xsl:value-of select="substring(translate(translate(normalize-space($time-string), ':' ,''), '-' ,''),9,6)"/>
        			<!-- <xsl:text>Z</xsl:text> -->
        		</xsl:when>

        		<xsl:when test="string-length(translate(translate(normalize-space($time-string), ':' ,''), '-' ,'')) = 6">
                    <xsl:value-of select="translate(translate(normalize-space($base-date), ':' ,''), '-' ,'')"/>
        			<xsl:text>T</xsl:text>
                    <xsl:value-of select="translate(translate(normalize-space($time-string), ':' ,''), '-' ,'')"/>
        			<!-- <xsl:text>Z</xsl:text> -->
        		</xsl:when>
		        
		        <xsl:otherwise>
        			<xsl:value-of select="translate(translate($time-string, ':' ,''), '-' ,'')"/>
		        </xsl:otherwise>
		    </xsl:choose>
		</xsl:when>
		<xsl:when test="substring-before($time-string,'Z') = true()">
			<xsl:value-of select="translate(translate(substring-before($time-string,'Z'), ':' ,''), '-' ,'')"/>			
			<!-- need to pad with 0000s if needed -->
			<xsl:if test="string-length(translate(translate(substring-before($time-string,'Z'), ':' ,''), '-' ,''))  &lt; 10">
				<xsl:text>0</xsl:text>
			</xsl:if>
			<xsl:if test="string-length(translate(translate(substring-before($time-string,'Z'), ':' ,''), '-' ,''))  &lt; 11">
				<xsl:text>0</xsl:text>
			</xsl:if>
			<xsl:if test="string-length(translate(translate(substring-before($time-string,'Z'), ':' ,''), '-' ,''))  &lt; 12">
				<xsl:text>0</xsl:text>
			</xsl:if>
			<xsl:if test="string-length(translate(translate(substring-before($time-string,'Z'), ':' ,''), '-' ,''))  &lt; 13">
				<xsl:text>0</xsl:text>
			</xsl:if>
			<xsl:if test="string-length(translate(translate(substring-before($time-string,'Z'), ':' ,''), '-' ,''))  &lt; 14">
				<xsl:text>0</xsl:text>
			</xsl:if>
			<xsl:if test="string-length(translate(translate(substring-before($time-string,'Z'), ':' ,''), '-' ,''))  &lt; 15">
				<xsl:text>0</xsl:text>
			</xsl:if>			
			<xsl:text>Z</xsl:text>
		</xsl:when>
		<xsl:when test="string-length(translate(translate(normalize-space($time-string), ':' ,''), '-' ,'')) = 12">
			<xsl:value-of select="substring(translate(translate(normalize-space($time-string), ':' ,''), '-' ,''),1,8)"/>
			<xsl:text>T</xsl:text>
			<xsl:value-of select="substring(translate(translate(normalize-space($time-string), ':' ,''), '-' ,''),9,4)"/>						
			<xsl:text>00</xsl:text>
			<xsl:text>Z</xsl:text>
		</xsl:when>
		<xsl:when test="string-length(translate(translate(normalize-space($time-string), ':' ,''), '-' ,'')) = 14">
			<xsl:value-of select="substring(translate(translate(normalize-space($time-string), ':' ,''), '-' ,''),1,8)"/>
			<xsl:text>T</xsl:text>
			<xsl:value-of select="substring(translate(translate(normalize-space($time-string), ':' ,''), '-' ,''),9,6)"/>						
			<xsl:text>Z</xsl:text>
		</xsl:when>

		
		
		<!-- just times get passed in -->
		<xsl:when test="string-length(translate(normalize-space($time-string), ':' ,'')) = 6">
		    <xsl:call-template name="datetime:utc-time-converter">
        	    <xsl:with-param name="time-string">
	                <xsl:value-of select="$base-date"/>
			        <xsl:text>T</xsl:text>
			        <xsl:value-of select="translate(normalize-space($time-string), ':' ,'')"/>
		            <xsl:if test="$base-tzid = true()">
		        	    <xsl:value-of select="$base-tzid"/>
		            </xsl:if>
		        </xsl:with-param>
    	    </xsl:call-template>
		</xsl:when>	
		<xsl:when test="string-length(translate(normalize-space($time-string), ':' ,'')) = 4">
		    <xsl:call-template name="datetime:utc-time-converter">
        	    <xsl:with-param name="time-string">
	                <xsl:value-of select="$base-date"/>
			        <xsl:text>T</xsl:text>
			        <xsl:value-of select="translate(normalize-space($time-string), ':' ,'')"/>
        			<xsl:text>00</xsl:text>
		            <xsl:if test="$base-tzid = true()">
		        	    <xsl:value-of select="$base-tzid"/>
		            </xsl:if>
		        </xsl:with-param>
    	    </xsl:call-template>
		</xsl:when>		
		<xsl:when test="string-length(translate(normalize-space($time-string), ':' ,'')) = 2">
		    <xsl:call-template name="datetime:utc-time-converter">
        	    <xsl:with-param name="time-string">
	                <xsl:value-of select="$base-date"/>
			        <xsl:text>T</xsl:text>
			        <xsl:value-of select="translate(normalize-space($time-string), ':' ,'')"/>
        			<xsl:text>0000</xsl:text>
		            <xsl:if test="$base-tzid = true()">
		        	    <xsl:value-of select="$base-tzid"/>
		            </xsl:if>
		        </xsl:with-param>
    	    </xsl:call-template>
		</xsl:when>
		<xsl:when test="string-length(translate(normalize-space($time-string), ':' ,'')) = 1">
		    <xsl:call-template name="datetime:utc-time-converter">
        	    <xsl:with-param name="time-string">
	                <xsl:value-of select="$base-date"/>
			        <xsl:text>T</xsl:text>
        			<xsl:text>0</xsl:text>
			        <xsl:value-of select="translate(normalize-space($time-string), ':' ,'')"/>
        			<xsl:text>0000</xsl:text>
		            <xsl:if test="$base-tzid = true()">
		        	    <xsl:value-of select="$base-tzid"/>
		            </xsl:if>
		        </xsl:with-param>
    	    </xsl:call-template>
		</xsl:when>
		<!-- problems here with JUST a time string -->
		<xsl:otherwise>
			<xsl:variable name="event-year"> <xsl:value-of select="substring(translate($time-string, '-' ,''),1,4)"/></xsl:variable>
			<xsl:variable name="event-month"><xsl:value-of select="substring(translate($time-string, '-' ,''),5,2)"/></xsl:variable>
			<xsl:variable name="event-day">  <xsl:value-of select="substring(translate($time-string, '-' ,''),7,2)"/></xsl:variable>
			<xsl:variable name="event-date"><xsl:value-of select="substring-before(translate($time-string, '-' ,''),'T')"/></xsl:variable>
			<xsl:choose>
				<xsl:when test="substring-before(substring-after(translate($time-string, ':' ,''),'T'),'+') = true()">
					<xsl:choose>
						<xsl:when test="string-length(substring-before(substring-after(translate($time-string, ':' ,''),'T'),'+')) &lt; 6">
							<xsl:variable name="event-time"><xsl:value-of select="concat(substring-before(substring-after(translate($time-string, ':' ,''),'T'),'+'),'00')"/></xsl:variable>
							<xsl:choose>
								<xsl:when test="string-length(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+')) &lt; 4">
									<xsl:variable name="event-timezone"><xsl:value-of select="concat(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+'),'0000')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time - $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:when>
								<xsl:when test="string-length(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+')) &lt; 6">
									<xsl:variable name="event-timezone"><xsl:value-of select="concat(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+'),'00')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time - $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:when>
								<xsl:otherwise>
									<xsl:variable name="event-timezone"><xsl:value-of select="substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time - $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
						<xsl:otherwise>
							<xsl:variable name="event-time"><xsl:value-of select="substring-before(substring-after(translate($time-string, ':' ,''),'T'),'+')"/></xsl:variable>
							<xsl:choose>
								<xsl:when test="string-length(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+')) &lt; 4">
									<xsl:variable name="event-timezone"><xsl:value-of select="concat(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+'),'0000')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time - $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:when>
								<xsl:when test="string-length(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+')) &lt; 6">
									<xsl:variable name="event-timezone"><xsl:value-of select="concat(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+'),'00')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time - $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:when>

								<xsl:otherwise>
									<xsl:variable name="event-timezone"><xsl:value-of select="substring-after(substring-after(translate($time-string, ':' ,''),'T'),'+')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time - $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<xsl:when test="substring-before(substring-after(translate($time-string, ':' ,''),'T'),'-') = true()">
					<xsl:choose>
						<xsl:when test="string-length(substring-before(substring-after(translate($time-string, ':' ,''),'T'),'-')) &lt; 6">
							<xsl:variable name="event-time"><xsl:value-of select="concat(substring-before(substring-after(translate($time-string, ':' ,''),'T'),'-'),'00')"/></xsl:variable>
							<xsl:choose>
								<xsl:when test="string-length(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-')) &lt; 4">
									<xsl:variable name="event-timezone"><xsl:value-of select="concat(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-'),'0000')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time + $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:when>

								<xsl:when test="string-length(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-')) &lt; 6">
									<xsl:variable name="event-timezone"><xsl:value-of select="concat(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-'),'00')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time + $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:when>
								<xsl:otherwise>
									<xsl:variable name="event-timezone"><xsl:value-of select="substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time + $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
						<xsl:otherwise>
							<xsl:variable name="event-time"><xsl:value-of select="substring-before(substring-after(translate($time-string, ':' ,''),'T'),'-')"/></xsl:variable>
							<xsl:choose>
								<xsl:when test="string-length(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-')) &lt; 4">
									<xsl:variable name="event-timezone"><xsl:value-of select="concat(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-'),'0000')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time + $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:when>

								<xsl:when test="string-length(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-')) &lt; 6">
									<xsl:variable name="event-timezone"><xsl:value-of select="concat(substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-'),'00')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time + $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:when>
								<xsl:otherwise>
									<xsl:variable name="event-timezone"><xsl:value-of select="substring-after(substring-after(translate($time-string, ':' ,''),'T'),'-')"/></xsl:variable>
									<xsl:call-template name="datetime:build-utc">
										<xsl:with-param name="event-year"><xsl:value-of select="normalize-space($event-year)" /></xsl:with-param>
										<xsl:with-param name="event-month"><xsl:value-of select="normalize-space($event-month)" /></xsl:with-param>
										<xsl:with-param name="event-day"><xsl:value-of select="normalize-space($event-day)" /></xsl:with-param>
										<xsl:with-param name="utc-event-time"><xsl:value-of select="normalize-space($event-time + $event-timezone)" /></xsl:with-param>
									</xsl:call-template>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="normalize-space($event-year)"/>
					<xsl:value-of select="normalize-space($event-month)"/>
					<xsl:value-of select="normalize-space($event-day)"/>
					<xsl:text>T</xsl:text>
					<!-- hmm, does format-number pad the front or back of the string? -->
					<!--
					<xsl:value-of select="format-number(normalize-space(substring-after(translate($time-string, ':' ,''),'T')),'000000')"/>
					-->
					
					<xsl:if test="string-length(normalize-space(substring-after(translate($time-string, ':' ,''),'T'))) &lt; 6">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length(normalize-space(substring-after(translate($time-string, ':' ,''),'T'))) &lt; 5">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length(normalize-space(substring-after(translate($time-string, ':' ,''),'T'))) &lt; 4">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length(normalize-space(substring-after(translate($time-string, ':' ,''),'T'))) &lt; 3">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length(normalize-space(substring-after(translate($time-string, ':' ,''),'T'))) &lt; 2">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:value-of select="normalize-space(substring-after(translate($time-string, ':' ,''),'T'))"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>
	
	<!-- subtract a day if needed -->
    <xsl:choose>
	    <xsl:when test="$date-exclusive = 1 and string-length($cleaned-date-time) = 8">
			<xsl:variable name="adjusted-date-time">
			    <xsl:call-template name="datetime:build-utc">
				    <xsl:with-param name="event-year"><xsl:value-of select="substring($cleaned-date-time,1,4)" /></xsl:with-param>
				    <xsl:with-param name="event-month"><xsl:value-of select="substring($cleaned-date-time,5,2)" /></xsl:with-param>
				    <xsl:with-param name="event-day"><xsl:value-of select="substring($cleaned-date-time,7,2)" /></xsl:with-param>
				    <xsl:with-param name="utc-event-time">240000</xsl:with-param>
			    </xsl:call-template>
            </xsl:variable>
	        <xsl:value-of select="substring-before($adjusted-date-time,'T')" />
        </xsl:when>
        <xsl:otherwise>
	        <xsl:value-of select="$cleaned-date-time" />
        </xsl:otherwise>
    </xsl:choose>
	</xsl:template>

	<!-- create a valid UTC date and increments day/month/year as needed -->
	<xsl:template name="datetime:build-utc">
	<xsl:param name="event-year"></xsl:param>
	<xsl:param name="event-month"></xsl:param>
	<xsl:param name="event-day"></xsl:param>
	<xsl:param name="utc-event-time"></xsl:param>

<!--
    <xsl:text>{</xsl:text>
    <xsl:value-of select="$utc-event-time"/>
    <xsl:text>}</xsl:text>
-->
	<xsl:choose>
		<xsl:when test="$utc-event-time &gt; 235959">
    	    
			<xsl:choose>
				<xsl:when test="($event-month = 12) and ($event-day = 31)">
					<xsl:value-of select="$event-year + 1"/>			
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$event-year"/>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:choose>
				<xsl:when test="(($event-month = 12) and ($event-day = 31))">
					<xsl:text>01</xsl:text>	
				</xsl:when>
				<xsl:when test="(($event-month = 11) and ($event-day = 30)) or (($event-month = 10) and ($event-day = 31)) or (($event-month = 9) and ($event-day = 30))">
					<xsl:value-of select="$event-month + 1"/>	
				</xsl:when>
				<xsl:when test="(($event-month = 8) and ($event-day = 31)) or (($event-month = 7) and ($event-day = 31)) or (($event-month = 6) and ($event-day = 30)) or (($event-month = 5) and ($event-day = 31)) or (($event-month = 4) and ($event-day = 30)) or (($event-month = 3) and ($event-day = 31)) or (($event-month = 1) and ($event-day = 31)) or ($event-month = 2) and ($event-day = 29)">
					<xsl:text>0</xsl:text><xsl:value-of select="$event-month + 1"/>	
				</xsl:when>
				<xsl:when test="(($event-month = 2) and ($event-day = 28) and (($event-year mod 4) != 0) or (($event-year mod 400) != 0) and (($event-year mod 100) = 0))">
					<xsl:text>0</xsl:text><xsl:value-of select="$event-month + 1"/>				
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$event-month"/>
				</xsl:otherwise>		
			</xsl:choose>
			<xsl:choose>
				<xsl:when test="(($event-month = 12) and ($event-day = 31)) or (($event-month = 11) and ($event-day = 30)) or (($event-month = 10) and ($event-day = 31)) or (($event-month = 9) and ($event-day = 30)) or (($event-month = 8) and ($event-day = 31)) or (($event-month = 7) and ($event-day = 31)) or (($event-month = 6) and ($event-day = 30)) or (($event-month = 5) and ($event-day = 31)) or (($event-month = 4) and ($event-day = 30)) or (($event-month = 3) and ($event-day = 31)) or (($event-month = 1) and ($event-day = 31)) or ($event-month = 2) and ($event-day = 29)">
					<xsl:text>01</xsl:text>
				</xsl:when>
				<xsl:when test="(($event-month = 2) and ($event-day = 28) and (($event-year mod 4) != 0) or (($event-year mod 400) != 0) and (($event-year mod 100) = 0))">
					<xsl:text>01</xsl:text>
				</xsl:when>
				<xsl:when test="(($event-day = 2) or ($event-day = 3) or ($event-day = 4) or ($event-day = 5) or ($event-day = 6) or ($event-day = 7) or ($event-day = 8))">
					<xsl:text>0</xsl:text><xsl:value-of select="$event-day + 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$event-day + 1"/>			
				</xsl:otherwise>
			</xsl:choose>

			<xsl:text>T</xsl:text>
					<xsl:if test="string-length($utc-event-time mod 240000) &lt; 6">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length($utc-event-time mod 240000) &lt; 5">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length($utc-event-time mod 240000) &lt; 4">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length($utc-event-time mod 240000) &lt; 3">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length($utc-event-time mod 240000) &lt; 2">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<!--
					<xsl:if test="string-length($utc-event-time mod 240000) = 1">
						<xsl:text>0</xsl:text>
					</xsl:if>
					-->
	<!--
			<xsl:if test="string-length($utc-event-time mod 240000) &lt; 6">
			<xsl:text>0</xsl:text>
			</xsl:if>
	-->
			<xsl:value-of select="$utc-event-time mod 240000"/>
			<xsl:text>Z</xsl:text>
		</xsl:when>
		<xsl:when test="$utc-event-time &lt; 0">
			<xsl:choose>
				<xsl:when test="($event-month = 1) and ($event-day = 1)">
					<xsl:value-of select="$event-year - 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$event-year"/>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:choose>
				<xsl:when test="(($event-month = 1) and ($event-day = 1))">
					<xsl:text>12</xsl:text>
				</xsl:when>
				<xsl:when test="(($event-month = 11) and ($event-day = 1)) or (($event-month = 12) and ($event-day = 1))">
					<xsl:value-of select="$event-month - 1"/>
				</xsl:when>
				<xsl:when test="(($event-month = 10) and ($event-day = 1)) or (($event-month = 9) and ($event-day = 1)) or (($event-month = 8) and ($event-day = 1)) or (($event-month = 7) and ($event-day = 1)) or (($event-month = 6) and ($event-day = 1)) or (($event-month = 5) and ($event-day = 1)) or (($event-month = 4) and ($event-day = 1)) or (($event-month = 3) and ($event-day = 1)) or ($event-month = 2) and ($event-day = 1)">
					<xsl:text>0</xsl:text><xsl:value-of select="$event-month - 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$event-month"/>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:choose>
				<xsl:when test="(($event-month = 11) and ($event-day = 1)) or (($event-month = 9) and ($event-day = 1)) or (($event-month = 6) and ($event-day = 1)) or (($event-month = 4) and ($event-day = 1)) or (($event-month = 2) and ($event-day = 1)) or (($event-month = 1) and ($event-day = 1))">
					<xsl:text>31</xsl:text>
				</xsl:when>
				<xsl:when test="(($event-month = 12) and ($event-day = 1)) or (($event-month = 10) and ($event-day = 1)) or (($event-month = 7) and ($event-day = 1)) or (($event-month = 5) and ($event-day = 1))">
					<xsl:text>30</xsl:text>
				</xsl:when>
				<xsl:when test="(($event-month = 3) and ($event-day = 1) and (($event-year mod 4) != 0) or (($event-year mod 400) != 0) and (($event-year mod 100) = 0))">
					<xsl:text>28</xsl:text>
				</xsl:when>
				<xsl:when test="(($event-month = 3) and ($event-day = 1) and (($event-year mod 4) = 0) or (($event-year mod 400) = 0) and (($event-year mod 100) != 0))">
					<xsl:text>29</xsl:text>
				</xsl:when>
				<xsl:otherwise>
                    <xsl:if test="string-length($event-day - 1) = 1">
        		        <xsl:text>0</xsl:text>
        		    </xsl:if>
					<xsl:value-of select="$event-day - 1"/>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:text>T</xsl:text>
			<!-- not sure about this-->
			<xsl:if test="string-length(240000 + $utc-event-time) &lt; 0">
			    <xsl:text>0</xsl:text>
			</xsl:if>
			<xsl:if test="(240000 + $utc-event-time) = false()">
			    <xsl:text>000000</xsl:text>
			</xsl:if>
			<xsl:value-of select="240000 + $utc-event-time"/>
			<xsl:text>Z</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$event-year"/>
			<xsl:value-of select="$event-month"/>
			<xsl:value-of select="$event-day"/>
			<xsl:text>T</xsl:text>

			<xsl:choose>
				<xsl:when test="$utc-event-time = 240000 or $utc-event-time = 0">
					<xsl:text>000000</xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:if test="string-length($utc-event-time) &lt; 6">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length($utc-event-time) &lt; 5">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length($utc-event-time) &lt; 4">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length($utc-event-time) &lt; 3">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length($utc-event-time) &lt; 2">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:if test="string-length($utc-event-time) = 1">
						<xsl:text>0</xsl:text>
					</xsl:if>
					<xsl:value-of select="$utc-event-time"/>
				</xsl:otherwise>
			</xsl:choose>


			<xsl:text>Z</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
	</xsl:template>

	<!-- recursive function to get all the RDATE times and check them for UTC -->
	<xsl:template name="datetime:rdate-comma-utc">
		<xsl:param name="text-string"/>
		<xsl:choose>
			<xsl:when test="substring-before($text-string,',') = true()">
				<xsl:call-template name="datetime:utc-time-converter">
					<xsl:with-param name="time-string"><xsl:value-of select="normalize-space(substring-before(substring-before($text-string,','),'/'))" /></xsl:with-param>
				</xsl:call-template>
				<xsl:text>/</xsl:text>
				<xsl:call-template name="datetime:utc-time-converter">
					<xsl:with-param name="time-string"><xsl:value-of select="normalize-space(substring-after(substring-before($text-string,','),'/'))" /></xsl:with-param>
				</xsl:call-template>
				<xsl:text>,</xsl:text>
				<xsl:call-template name="datetime:rdate-comma-utc">
					<xsl:with-param name="text-string"><xsl:value-of select="substring-after($text-string,',')"/></xsl:with-param>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="datetime:utc-time-converter">
					<xsl:with-param name="time-string"><xsl:value-of select="normalize-space(substring-before($text-string,'/'))" /></xsl:with-param>
				</xsl:call-template>
				<xsl:text>/</xsl:text>
				<xsl:call-template name="datetime:utc-time-converter">
					<xsl:with-param name="time-string"><xsl:value-of select="normalize-space(substring-after($text-string,'/'))" /></xsl:with-param>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>	
	
</xsl:transform>
